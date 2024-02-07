# 1-Percent-Club-Frontend

## Technologies Used

- React.js
- Recharts
- Css
- Material UI (Mui)


## Key Features/Functionalities

1. **Authentication using JWTs:**
   - Secure user authentication using JSON Web Tokens (JWTs).

2. **Protected Route**
   - Protected Route to shield the home page to unauthorized user.

3. **Deployed Frontend:**
   - The frontend is deployed on Vercel to provide a seamless user experience.


## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/roshan3216/1-Percent-Club-Frontend.git

2. Install Dependencies
    ```bash
    cd 1-Percent-Club-Frontend
    npm install

3. Start the Development Server
    ```bash
    npm start

## Deployment

The application is deployed on Netlify. [Link to Vercel Deployment](https://1-percent-club.vercel.app/)


## Notes
 - Completed and pending cards in the homepage shows the completed tasks for present day, pending tasks shows the number of tasks not completed and scheduled for the upcoming days, and the due tasks shows the number of tasks that is not completed in the present day and before. The same is reflected in the chart.

 - Sorting functions goes from higher value to lower value, while in case of todays' and tomorrows' sorting logic it show the taks with due date as today and tomorrow irrespective of completion status.
 
 - Sort by due tasks show tasks that are incomplete with due day as the present day.

 -- Considering past date incomplete tasks as over due tasks and upcoming incomplete tasks as pending tasks.
