@echo off
echo ========================================
echo XAMPP MySQL Database Reset Utility
echo ========================================
echo.

REM Stop MySQL
echo Stopping MySQL...
taskkill /F /IM mysqld.exe 2>nul
timeout /t 2 >nul

REM Delete database folder
echo Deleting collage database folder...
if exist "C:\xampp\mysql\data\collage" (
    rmdir /S /Q "C:\xampp\mysql\data\collage"
    echo Database folder deleted successfully
) else (
    echo Database folder not found
)

REM Start MySQL
echo Starting MySQL...
start "" "C:\xampp\mysql_start.bat"
timeout /t 5 >nul

echo.
echo ========================================
echo Database reset complete!
echo.
echo Next steps:
echo 1. Open phpMyAdmin
echo 2. Run: CREATE DATABASE collage CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
echo 3. Run: npm run migration:run:seed
echo ========================================
pause
