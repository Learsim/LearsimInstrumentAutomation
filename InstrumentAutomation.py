import pymem
import pymem.process
import pymem.exception
import time
import pyautogui
import json
import time
import os
import sys
import threading
import keyboard
from PySide2 import QtWidgets, QtGui
from os import system, name 

screenWidht, screenHeight = pyautogui.size()
configLocation = "config.json"
ADDRESS_OFFSET = (0x3598888)

#0x7ff6b1ba2528

class SystemTrayIcon(QtWidgets.QSystemTrayIcon):
    def __init__(self,icon,parent=None):
        QtWidgets.QSystemTrayIcon.__init__(self,icon,parent)
        menu = QtWidgets.QMenu(parent)
        self.isRecording = False
        toggleMemoryRead = menu.addAction("Toggle Memory Reading")
        toggleMemoryRead.triggered.connect(self.toggleReading)
        recordNewSequence = menu.addAction("Record New Sequence")
        recordNewSequence.triggered.connect(self.NewSequence)
        #recordNewSequence.setEnabled(False)
        openConfig = menu.addAction("Open Configuration")
        openConfig.triggered.connect(self.open_config)



        exitApp = menu.addAction("Exit")
        exitApp.triggered.connect(self.exit)


        menu.addSeparator()
        self.setContextMenu(menu)
        self.activated.connect(self.onTrayIconActivated)

    def onTrayIconActivated(self, reason):
        """
        This function will trigger function on click or double click
        :param reason:
        :return:
        """
        if reason == self.DoubleClick:
            print("DoubleClick")
    def exit(self, reason):
        self.setIcon(QtGui.QIcon("assets/iconE.png"))
        self.setToolTip("Shutting Down...")
        self.thread.exitThread()
        if self.isRecording: self.recording.exitThread()
        sys.exit()
    def setThread(self, thread):
        self.thread = thread
    def open_config(self):
        os.system('start config.json')

    def toggleReading(self):
        self.thread.togglePauseReading()
    def setNewToolTip(self, tt):
        self.setToolTip(tt)
    def setNewIcon(self,icon):
        self.setIcon(icon)
    def NewSequence(self):
        self.isRecording = True 
        self.recording = RecordInput()
        self.recording.start()


f = open(configLocation, "r")
steps = json.loads(f.read())

def move(x,y):
    print(f'Moving to {x},{y}')
    pyautogui.moveTo(x=x,y=y)
    return True
def drag(x,y,dur):
    print(f'Draging to {x},{y} in {dur} seconds')
    pyautogui.dragTo(x,y,dur,button='left')
    return True
def popout(x,y):
    print(f'Popping out window at {x},{y}')  
    pyautogui.keyDown('i')   
    pyautogui.moveTo(x=x,y=y)
    time.sleep(0.01)   
    pyautogui.mouseDown(button='left')
    time.sleep(0.01)  
    pyautogui.mouseUp(button='left')
    time.sleep(0.01)   
    pyautogui.keyUp('i')
    return True
def mouseClick(x,y,btn):
    print(f'Pressing {btn} click at {x},{y}')
    pyautogui.moveTo(x=x,y=y)
    time.sleep(0.01)   
    pyautogui.mouseDown(button='left')
    time.sleep(0.01)  
    pyautogui.mouseUp(button='left')
    return True
def keyPress(btn,dur):
    if(dur == 0):
        print(f'Pressing {btn}')
        pyautogui.press(btn)
    else:
        print(f'Pressing {btn} for {dur} seconds')
        pyautogui.keyDown(btn)
        time.sleep(dur)
        pyautogui.keyUp(btn)
    
    return True
def delay(dur):
    print(f'Waiting for {dur}')
    time.sleep(dur)
    return True
def combKeyPress(btn1,btn2):
    print(f'Pressing for {btn1} and {btn2}')
    pyautogui.keyDown(btn1)
    time.sleep(0.1) 
    pyautogui.press(btn2)
    time.sleep(0.1) 
    pyautogui.keyUp(btn1)
    return True
def doAuto():
    for step in steps['steps']:
        if step['type'] == "move":
            move(step['x'],step['y'])
        elif step['type'] == "drag":
            drag(step['x'],step['y'],step['duration'])
        elif step['type'] == "popout":
            popout(step['x'],step['y'])     
        elif step['type'] == "mouseClick":
            mouseClick(step['x'],step['y'],step['key'])
        elif step['type'] == "keyPress":
            keyPress(step['key'],step['duration'])
        elif step['type'] == "delay":
            delay(step['duration'])
        elif step['type'] == "combinationPress":
            combKeyPress(step['key1'],step['key2'])


   
    
class MemoryRead (threading.Thread):
    def __init__(self,trayicon,w):
        threading.Thread.__init__(self)
        self.tray_icon = trayicon
        self.w = w
        self.RunThread = True
        self.paused = False
        self.readingMemory = False
        self.recordingThread = False
        self.thread = ''
    def run(self):
        while self.RunThread:
            if not self.paused and not self.readingMemory:
                try:                
                    pm = pymem.Pymem("FlightSimulator.exe")
                    client = pymem.process.module_from_name(pm.process_handle, "FlightSimulator.exe").lpBaseOfDll
                    self.thread = ReadMemoryAdress(pm,client)
                    self.thread.start()
                    self.readingMemory = True
                    self.tray_icon.setNewIcon(QtGui.QIcon("assets/iconG.png"))
                    self.tray_icon.setNewToolTip(f"Reading memory @ {hex(client+  0x3592528)}")
                    

                except pymem.exception.ProcessNotFound:
                    print("Could not attach to FS2020, is it running?")
                    print("Testing in 10 seconds again...")
                    time.sleep(10)
                    pass
            if self.readingMemory:
                if not self.thread.is_alive():
                    self.tray_icon.setNewIcon(QtGui.QIcon("assets/icon.png"))
                    self.tray_icon.setNewToolTip(f"Not Monitoring Memory")
                    self.readingMemory = False
                    
        
    def exitThread(self):
        self.RunThread = False
        if self.recordingThread:    
            if self.thread.is_alive():
                self.thread.exitThread()
    
    def togglePauseReading (self):
        
        self.paused = not (bool(self.paused))
        if(self.paused):
            self.tray_icon.setIcon(QtGui.QIcon("assets/icon.png"))
            self.tray_icon.setNewToolTip(f"Not Monitoring Memory (Paused)")
        else:
            self.tray_icon.setNewToolTip(f"Not Monitoring Memory")

        
    
class ReadMemoryAdress(threading.Thread):
    def __init__(self,pm,client):
        
        threading.Thread.__init__(self)
        self.RunThread = True
        self.Process = pm
        self.ProcessModule = client
        self.value = 'NaN'
        system('cls') 
        print(f"Started memory monitoring...... @ {hex(client+  ADDRESS_OFFSET)}")
    def run(self):
        try:
            while True:
                if not self.RunThread:
                    break
                testread = self.Process.read_int(self.ProcessModule+  ADDRESS_OFFSET)
                
                if(testread == 256 and testread != self.value and (self.value == 0 or self.value == 'NaN')):
                    doAuto()
                    self.value = testread
                    print("Detected Cockpit")
                elif(testread == 0 and testread != self.value):
                    self.value = 0
                    print("Detected No Cockpit")
                else:
                    self.value = testread
                time.sleep(1)    
        except:
            return
    def exitThread(self):
        self.RunThread = False
class RecordInput(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.RunThread = True
        self.Recording = True
        self.Sequence = []
        keyboard.add_hotkey('num 1',self.KeyPress,args=[1])
        keyboard.add_hotkey('num 2',self.KeyPress,args=[2])
        keyboard.add_hotkey('num 3',self.KeyPress,args=[3])
        keyboard.add_hotkey('num 4',self.KeyPress,args=[4])
    def run(self):
        print("Recording New Input")
        while self.Recording:
            if keyboard.is_pressed("F12"):
                self.exitThread()
                return

    def exitThread(self):
        print("Stopped Recording")
        print(self.Sequence)
        self.Recording = False
        self.RunThread = False

    def KeyPress(self,num):
        print(num)
        mousePos = pyautogui.position()
        if num == 1:
            self.Sequence.append({"type":"move","x":mousePos.x,"y":mousePos.y})
        elif num == 2:
            self.Sequence.append({"type":"drag","x":mousePos.x,"y":mousePos.y,"duration":1})
        elif num == 3:
            self.Sequence.append({"type":"popout","x":mousePos.x,"y":mousePos.y})
        elif num == 4:
            self.Sequence.append({"type":"mouseClick","x":mousePos.x,"y":mousePos.y,"key":"left"})
        
    

def main():
    app = QtWidgets.QApplication(sys.argv)
    w = QtWidgets.QWidget()
    tray_icon = SystemTrayIcon(QtGui.QIcon("assets/icon.png"),w)
    mR = MemoryRead(tray_icon,w)
    mR.start()
    tray_icon.setThread(mR)
    tray_icon.show()
    sys.exit(app.exec_())

    


if __name__ == '__main__':
    main()

