// Expanded astronomy events data covering multiple months
const astronomyEvents = {
    // March 2024
    '2024-03-06': [{
        title: 'Venus at Greatest Western Elongation',
        time: '04:00 UTC',
        description: 'Best time to view Venus in the morning sky',
        category: 'planetary',
        location: 'Worldwide',
        viewingTips: 'Look towards the eastern horizon before sunrise'
    }],
    '2024-03-10': [{
        title: 'Mercury Elongation',
        time: '20:00 UTC',
        description: 'Mercury at greatest eastern elongation',
        category: 'planetary',
        location: 'Worldwide',
        viewingTips: 'Best viewed shortly after sunset'
    }],
    '2024-03-15': [{
        title: 'Lunar Occultation',
        time: '22:30 UTC',
        description: 'Moon passes in front of bright star Antares',
        category: 'lunar',
        location: 'Asia and Europe',
        viewingTips: 'Use binoculars or small telescope'
    }],
    
    // April 2024
    '2024-04-08': [{
        title: 'Total Solar Eclipse',
        time: '18:15 UTC',
        description: 'Total solar eclipse visible across North America',
        category: 'eclipse',
        location: 'North America',
        viewingTips: 'Use proper solar filters or eclipse glasses'
    }],
    '2024-04-22': [{
        title: 'Lyrid Meteor Shower',
        time: '23:00 UTC',
        description: 'Annual meteor shower peaks tonight',
        category: 'meteor',
        location: 'Northern Hemisphere',
        viewingTips: 'Best viewed after midnight in dark locations'
    }],
    
    // May 2024
    '2024-05-15': [{
        title: 'Jupiter-Saturn Conjunction',
        time: '15:30 UTC',
        description: 'Close approach of Jupiter and Saturn',
        category: 'planetary',
        location: 'Worldwide',
        viewingTips: 'Visible with naked eye, better with telescope'
    }]
};

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar-grid');
    const selectedEvents = document.querySelector('.selected-events');
    const monthDisplay = document.querySelector('.calendar-header h2');
    let currentDate = new Date();
    
    function updateCalendarHeader() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        monthDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    function generateCalendar(date) {
        updateCalendarHeader();
        
        // Clear existing calendar days except headers
        while (calendar.children.length > 7) {
            calendar.removeChild(calendar.lastChild);
        }
        
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        // Add empty cells for days before the first of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Check if current day
            const isToday = new Date().toDateString() === new Date(dateString).toDateString();
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            // Add event indicators
            if (astronomyEvents[dateString]) {
                dayElement.classList.add('has-event');
                const eventCount = astronomyEvents[dateString].length;
                const eventDot = document.createElement('span');
                eventDot.className = 'event-dot';
                // Add multiple dots for multiple events
                if (eventCount > 1) {
                    eventDot.classList.add('multiple');
                }
                dayElement.appendChild(eventDot);
            }
            
            dayElement.innerHTML += day;
            
            // Add click event
            dayElement.addEventListener('click', () => {
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                // Add selected class to clicked day
                dayElement.classList.add('selected');
                showEvents(dateString);
            });
            
            calendar.appendChild(dayElement);
        }
    }
    
    function showEvents(dateString) {
        const events = astronomyEvents[dateString] || [];
        
        if (events.length === 0) {
            selectedEvents.innerHTML = `
                <h3>Events for ${formatDate(dateString)}</h3>
                <p class="no-events">No events scheduled for this date</p>
            `;
            return;
        }
        
        const eventsHTML = events.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <h4>${event.title}</h4>
                    <span class="event-time">${event.time}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span class="category-tag">${event.category}</span>
                    <span class="location-tag">${event.location}</span>
                </div>
                <div class="event-tips">
                    <h5>Viewing Tips:</h5>
                    <p>${event.viewingTips}</p>
                </div>
            </div>
        `).join('');
        
        selectedEvents.innerHTML = `
            <h3>Events for ${formatDate(dateString)}</h3>
            ${eventsHTML}
        `;
    }
    
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Initialize calendar
    generateCalendar(currentDate);
    
    // Add navigation functionality
    document.querySelector('.nav-btn.prev').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });
    
    document.querySelector('.nav-btn.next').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });
    
    // Add category filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const allEvents = document.querySelectorAll('.event-card');
        
        allEvents.forEach(event => {
            const category = event.querySelector('.category-tag').textContent;
            if (selectedCategory === 'all' || category === selectedCategory) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });
    });
});
