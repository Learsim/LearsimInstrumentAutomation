
Write-Output "Removing old files"
$files = Get-ChildItem .
foreach ($file in $files){
    if($file.name -ne "Upd.ps1" -And $file.name -ne "temp" -And $file.name -ne "config.json"){
        Remove-Item -Recurse -Force $file
    }
}
Write-Output "Copying new files"
#Copy Files
Copy-Item -Path ".\temp\Update.bat" -Destination "."
Copy-Item -Path ".\temp\requirements.txt" -Destination "."
Copy-Item -Path ".\temp\config_example.json" -Destination "."
Copy-Item -Path ".\temp\static" -Destination "." -Recurse
Copy-Item -Path ".\temp\assets" -Destination "." -Recurse
Copy-Item -Path ".\temp\templates" -Destination "." -Recurse
Copy-Item -Path ".\temp\InstrumentAutomation.py" -Destination "."
Write-Output "Installing pip packages (Can error but its okay.)"
pip install -q -r requirements.txt
Write-Output "Cleaning up...."
Remove-Item -Force "requirements.txt"
Remove-Item -Recurse -Force .\temp
