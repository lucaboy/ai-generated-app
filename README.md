# AI-Generated E-Learning Web Application

This repository contains the code for an AI-generated e-learning web application developed using the GPT-4 model by OpenAI. The application is designed to facilitate online exams, enabling instructors to create and manage exams while allowing students to participate and receive their results.

## Architecture and Technology Stack

- **Frontend**: Developed using the React framework, providing a dynamic and interactive user interface.
- **Backend**: Built with Node.js and Express, ensuring efficient handling of application logic.
- **Database**: MongoDB is used for data storage, managing both student and exam data.

## Core Functionalities

### Authentication
- Instructors log in with predefined credentials.
- Students receive unique credentials via email, which are required to access the exams.

### Exam Management
- Instructors can upload multiple-choice questions and set parameters like exam duration, start, and end dates.
- Students can attempt the exam within a specified time frame, with the system automatically calculating scores.

### Result Notification
- After the exam, students receive their scores via email, ensuring prompt feedback on performance.

### Instructor Panel
- Provides tools for managing exams, student credentials, and reviewing results.

## Security Considerations

During development, several security vulnerabilities were identified:

- **Weak Password Policies**: Instructors can set weak passwords, potentially compromising security.
- **Unauthenticated User Creation**: The user creation API lacks authentication, allowing unauthorized creation of users with elevated privileges.
- **API Exposure**: The API inadvertently exposes correct answers to exam questions, which could be exploited by students.
- **Timer Bypass**: The exam timer can be bypassed, undermining the integrity of the timed assessments.

## Development Challenges

- The generated code required modifications to function correctly due to deprecated library functions.
- Some core functionalities, such as the automated creation and management of student credentials via the instructor panel, were not fully implemented or were missing in the front-end.

## Future Enhancements

- Implementation of advanced security features, such as multi-factor authentication and encryption for email notifications, is critical to address the identified vulnerabilities.
- Enhancements to the instructor panel to fully support credential management and exam question uploads.

## Purpose

This repository serves as a demonstration of the capabilities and limitations of AI-generated code, highlighting the need for careful security assessments and iterative development to ensure a robust and secure application.
