//on start button click, increment timer but local time
//on pause, pause timer
//on stop, freeze timer

//worry about the input field after, just want to get this working

//initial commit
document.addEventListener('DOMContentLoaded', () => { 
    let timerRunning = false;
    let currentStart = 0
    let pauseOffset = 0
    let seconds = 0
    let minutes = 0
    let hours = 0
    timerButton = document.querySelector('#start')
    timerButton.addEventListener('click', () => {
        console.log('button clicked')
        if (!timerRunning) {
            //initialize timer if not running
            console.log('initializing timer')
            currentStart = Date.now()
            console.log(currentStart)
            timerRunning = true
            interval = window.setInterval(updateTime, 1000);
        } 

        function updateTime() {
            //updates the timer every 1s and formats correctly
            //currently need a way for it to go from current if paused
            totalElapsedSeconds = (Date.now() - currentStart) + pauseOffset //in seconds
            seconds = Math.floor(totalElapsedSeconds / 1000) % 60
            minutes = Math.floor(totalElapsedSeconds / 60000) % 60
            hours =  Math.floor(totalElapsedSeconds / 3600000)
            console.log(totalElapsedSeconds)
            document.querySelector('#timer_text').innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` 
        }
        }
    );
    pauseButton = document.querySelector('#pause')
    pauseButton.addEventListener('click', () => {
        if (timerRunning) {
            console.log('pause button clicked')
            clearInterval(interval)
            pauseOffset = totalElapsedSeconds
            timerRunning = false
        }
    })
    stopButton = document.querySelector('#stop')
    stopButton.addEventListener('click', () => {
        console.log('timer stopped')
        clearInterval(interval)
        let timerRanFor = Math.floor(totalElapsedSeconds / 1000)
        totalElapsedSeconds = 0
        pauseOffset = 0
        console.log(`timer ran for: ${timerRanFor}s`)
        document.querySelector('#timer_text').innerHTML = `00:00:00`
        timerRunning = false
        navigator.clipboard.writeText(`${document.querySelector('#task_output').textContent} - ${minutes}mins`);
        clipboardConfirm = document.querySelector('#clipboard_confirm')
        clipboardConfirm.innerHTML = 'Task Copied to Clipboard'
    })
    submitButton = document.querySelector('#task_submit')
    submitButton.addEventListener('click', () => {
        console.log('submit button pressed')
        task = document.querySelector('#task')
        document.querySelector('#task_output').innerHTML = task.value
        if (task.value) {
            document.querySelector('#buttons_div').style.visibility = 'visible';
            submitButton.style.visibility = 'hidden';
            task.style.visibility = 'hidden';    
        }
    } )
});