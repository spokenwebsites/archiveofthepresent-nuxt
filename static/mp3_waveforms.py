import os

rootdir = 'aud'
newDir = 'waveforms'
extensions = ('.mp3')

for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        ext = os.path.splitext(file)[-1].lower()
        if ext in extensions:
            filePath = os.path.join(subdir, file)
            newPath = newDir+"/"+filePath.replace(".mp3", ".json")
            newPath = newPath.replace(".MP3", ".json")
            directory = os.path.dirname(newPath)

            if not os.path.exists(directory):
                os.makedirs(directory)
            if not os.path.exists(newPath):
                # print (filePath, newPath)
                # waveformCmd = 'audiowaveform -i "' + filePath + '" --pixels-per-second 5 -b 16 --amplitude-scale 1 -o "' + newPath + '"';
                waveformCmd = 'audiowaveform -i "' + filePath + '" --pixels-per-second 100 -b 16 --amplitude-scale 1 -o "' + newPath + '"';
                os.system(waveformCmd)
                print ("waveform generated: " + newPath)
