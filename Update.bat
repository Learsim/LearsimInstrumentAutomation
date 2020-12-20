git clone https://github.com/axdra/LearsimInstrumentAutomation temp
if exist .\Upd.ps1 del .\Upd.ps1
xcopy /F temp\Upd.ps1 .\Upd.ps1
powershell -ExecutionPolicy Bypass -File .\Upd.ps1
