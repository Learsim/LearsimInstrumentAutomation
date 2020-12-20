#Getting newest source from github
$files = Get-ChildItem .
foreach ($file in $files){
    if($file.name -ne "Upd.ps1" -And $file.name -ne "temp" -And $file.name -ne "config.json"){
        Remove-Item -Recurse -Force $file
    }
}
#Copy Files
Copy-Item -Path ".\temp\Update.bat" -Destination "."
Copy-Item -Path ".\temp\requirements.txt" -Destination "."
Copy-Item -Path ".\temp\config_example.json" -Destination "."
Copy-Item -Path ".\temp\static" -Destination "." -Recurse
Copy-Item -Path ".\temp\assets" -Destination "." -Recurse
Copy-Item -Path ".\temp\templates" -Destination "." -Recurse
Copy-Item -Path ".\temp\InstrumentAutomation.py" -Destination "."
pip install -q -r requirements.txt
Remove-Item -Force "requirements.txt"
Copy-Item -Path ".\temp\Update.ps1" -Destination "."
Remove-Item -Recurse -Force .\temp
