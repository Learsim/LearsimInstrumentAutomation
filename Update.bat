@echo off
echo Getting newest source from github
git clone -q https://github.com/axdra/LearsimInstrumentAutomation temp
if exist .\Upd.ps1 del .\Upd.ps1
xcopy /Q /F temp\Upd.ps1 .\Upd.ps1*
echo Running update script
powershell -ExecutionPolicy Bypass -File .\Upd.ps1
