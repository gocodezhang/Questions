<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#scaling-techniques-and-performance">System Design and Performance</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# Question & Answers Microservice

## About The Project
The project is to revamp the existing backend system for an e-commerce website (please see the frontend details of the website [here](https://github.com/FEC-Pina-Fraise-Frivolities/Atelier)) by decomposing a monolithic API into multiple microservices including **Question & Answers**.

**Question & Answers Microservice** is responsible for all below HTTP requests.  Post revamp, the microservice can now handle 2000 RPS with 100ms latency and 0% error rate compared with the origin capacity of 100 RPS.
* Read a list of questions for a particular product
* Read a list of answers for a particular question
* Add a questions for a given product
* Add a answer for a given question
* Mark a question as helpful or report a question
* Mark an answer as helpful or report an answer

### Built With

This service is mainly built using ```Node.js``` and ```Express.js``` with ```PostreSQL``` database. It was deployed into AWS environment using total of 4 EC2 instances. Please note below for the comprehensive list of technology used

* ![Node.js]
* ![Express.js]
* ![PostgreSQL]
* ![Redis]
* ![Nginx]
* ![AWS]
* ![k6]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- SCALING TECHNIQUES AND PERFORMANCE -->
## System Design and Performance

### System Architecture
![system-diagram]

**Question & Answer Microservice** is deployed and live in the AWS cloud environment. The system consists of 4 EC2 instances where
1. One single EC2 instance is for Question & Answer database built with ```PostgreSQL```
   * It contains ETL processes and leverage indexing to maximize the read speed
2. Two EC2 instances are used as the servers to response to client requests.
   * Each server contains caching feature to avoid duplicated requests to the database
3. The last EC2 instance is for load balancing built with ```Nginx``` to distribute traffic among the two servers

### Performance

#### Database benchmark (prior to deployment):
* The microservice is able to withstand 100 RPS with latency <100ms and 0% error rate
* Test tool: k6

#### Final Performance (post deployment):
* The miscroservice is able to sustain 2000 RPS with latency ~50ms and 0% error rate
* Test tool: loader.io
![cloud-testing]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] further scale the current system to achieve 10K RPS

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Gaoyuan Zhang
* [![github]](https://github.com/gocodezhang)
* [![gmail]](mailto:zgy25483387@gmail.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white
[Nginx]: https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white
[AWS]: https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[k6]: https://img.shields.io/badge/k6-7D64FF.svg?style=for-the-badge&logo=k6&logoColor=white
[github]: https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white
[github-url]: https://github.com/gocodezhang
[gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[system-diagram]: assets/SDC-system-diagram.png
[cloud-testing]: assets/final-cloud-testing.png
[front-end-url]: https://github.com/FEC-Pina-Fraise-Frivolities/Atelier
