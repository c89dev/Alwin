#!/bin/bash

# Go to the project folder
cd /home/oml/Alwin

# Start Vite dev server in the background
npm run dev &

# Give Vite a few seconds to start
sleep 5

# Start the on-screen keyboard
onboard &

# Give onboard and the session time to initialize
sleep 10

# Set input method environment variables for Chromium
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus

# Launch Chromium in borderless app mode, maximized
chromium --app=http://localhost:5173 \
         --start-maximized \
         --disable-infobars \
         --noerrdialogs
