# Tasty Tounsi : Web Application

**Tasty Tounsi** is a modern food ordering and discovery platform focused on Tunisian cuisine. It provides a centralized, user-friendly system that allows customers to explore restaurants, browse menus, place orders online, and complete secure payments.

The goal of **Tasty Tounsi** is to digitalize Tunisian food services by offering a fast, scalable, and intuitive platform for both customers and restaurant owners. Key focus areas include a smooth online ordering experience, real-time order management, secure payments, and promotion of Tunisian culinary culture.




## Features

**User Features**
- Browse Tunisian menus
- Search and filter dishes by category or price
- Add items to cart and manage orders
- Secure checkout using Stripe
- Order history tracking

**Admin Features**
- Menu management
- Order monitoring and status updates
- User management and moderation

**Performance & UX**
- Responsive design for mobile and desktop
- Optimized API responses for fast loading
- Clean and intuitive user interface

**Security**
- JWT-based authentication
- Secure Stripe payment processing
- Input validation and API protection



## Tech Stack

**Frontend:** React.js, JavaScript (ES6+), HTML5 & CSS3  
**Backend:** Node.js, Express.js, RESTful API architecture  
**Database:** MongoDB (NoSQL)  
**Payment:** Stripe API


# Prerequisites

Before running the project, ensure you have the following installed:

- Node.js >= 18.x
- npm >= 9.x
- MongoDB (local or cloud)
- Stripe account (for API keys)
- Git



## Run Locally

**Backend Setup (`/backend`)**  
1. Navigate to the backend directory:  
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

4. Configure environment variables in .env
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

5. Start the backend server :
```bash
npm run server
```

**Frontend Setup (`/frontend`)**  
***NB : Same work for Admin Setup***

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```



## Contact

Maintainer: [Mohamed Aziz Omri](mailto:azizomriomri@gmail.com)  
Project Link: [https://github.com/AzizOmri2/TastyTounsi-WebApplication.git](https://github.com/AzizOmri2/TastyTounsi-WebApplication.git)  
Portfolio: [https://mohamedazizomri.netlify.app/](https://mohamedazizomri.netlify.app/)