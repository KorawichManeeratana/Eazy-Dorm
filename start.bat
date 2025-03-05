@echo off
goto :main

:node_up
    if not exist node_modules\ (
        call npm ci
    ) 
    start cmd /k "npm run dev"
    start "" http://localhost:3000
goto :eof

:main
    call :node_up
goto :eof