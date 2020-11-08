from distutils.core import setup
import py2exe
files = [('assets',['assets/icon.png','assets/iconG.png','assets/iconE.png','assets/iconP.png']), ('',['config.json']),('platforms',['Lib\site-packages\PySide2\plugins\platforms\qwindows.dll']) ]
setup(windows=['InstrumentAutomation.py'],data_files=files)
