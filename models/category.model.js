const categoryList = {
  appointment: {
    title: "Appointment",
    description:
      "The Appointment page allows G2 Admin to schedule and manage their driving test appointments with Ontario DriveTest.To start choose a date then available slots would be displayed confirm slots to book appointments.",
    //attributing appointment image
    // <a href="https://www.freepik.com/free-vector/date-picker-concept-illustration_11641634.htm#query=appointment&position=30&from_view=search&track=sph">Image by storyset</a> on Freepik
    image: "images/appointment.jpg",
  },
  login: {
    title: "Login",
    description:
      "The G2 license login page is an online platform provided by Ontario DriveTest that allows individuals holding a G2 license to access and manage their licensing information conveniently. The login page serves as a secure gateway for G2 license holders to view and update their personal details, track their progress towards obtaining a full G license, and access resources related to driving regulations and requirements. It offers a user-friendly interface where G2 license holders can log in using their unique credentials and navigate through various features and options tailored to their specific licensing needs.",
    //attributing login image
    // <a href="https://www.freepik.com/free-vector/driving-school-isometric-composition-with-images-instructor-learner-car-surrounded-by-safety-cones-illustration_6822692.htm#query=driving%20license&position=23&from_view=search&track=ais">Image by macrovector</a> on Freepik
    image: "images/login.jpg",
  },
  dashboard: {
    title: "Dashboard",
    description:
      "The G2 license dashboard page is a dedicated online interface provided by Ontario DriveTest for G2 license holders to access a range of useful features and information. The dashboard page serves as a centralized hub where G2 license holders can conveniently navigate through various options and functionalities related to their licensing journey. It offers a comprehensive overview of important details, such as license expiration date, demerit points, and any pending requirements or restrictions. G2 license holders can also find helpful resources, such as study materials for upgrading to a full G license, scheduling road tests, and accessing educational materials regarding safe driving practices. The dashboard page ensures that G2 license holders have easy access to essential information and resources to stay informed and make informed decisions regarding their driving privileges.",
    listItems: [
      "The G2 license login page is an online platform for G2 license holders in Ontario.",
      "It provides a secure gateway to access and manage personal licensing information.",
      "G2 license holders can track their progress, update personal details, and access driving-related resources.",
    ],
    //attributing dashboard image
    // <a href="https://www.freepik.com/free-vector/mobile-login-concept-illustration_4957136.htm#query=login&position=1&from_view=search&track=sph">Image by storyset</a> on Freepik
    image: "images/dashboard.jpg",
  },
  g: {
    title: "G - License",
    description:
      "The G license of Ontario DriveTest is the ultimate achievement for drivers in Ontario, Canada. With the G license, individuals have proven their expertise in handling vehicles and are granted full driving privileges. Obtaining a G license requires passing a rigorous road test that assesses both practical driving skills and knowledge of traffic rules and regulations. Successful applicants demonstrate proficiency in various maneuvers such as lane changes, parking, and highway driving. This license allows drivers to operate any vehicle, including large trucks and buses, granting them the freedom to travel anywhere within the province and beyond.",
    //attributing g1 image
    // <a href="https://www.freepik.com/free-vector/mobile-login-concept-illustration_4957136.htm#query=login&position=1&from_view=search&track=sph">Image by storyset</a> on Freepik
    image: "images/g1_image.jpg",
  },

  g2: {
    title: "G2 - License",
    description:
      "The G2 license is an intermediate level of driver's license issued by Ontario DriveTest, serving as a significant milestone for drivers in Ontario, Canada. With a G2 license, individuals have proven their basic driving skills and knowledge, granting them certain driving privileges. Obtaining a G2 license requires passing a written knowledge test and a road test that assesses practical driving skills. G2 license holders are permitted to drive on Ontario roads with some restrictions, such as not being allowed to drive between midnight and 5 a.m. and having a blood alcohol level of zero. This license allows drivers to gain valuable experience on the road while still learning and improving their driving abilities. It serves as an important stepping stone towards obtaining a full G license, which grants unrestricted driving privileges.",
    //attributing dasboard image
    // <a href="https://www.freepik.com/free-vector/setup-analytics-concept-illustration_7140765.htm#query=dashboard&position=27&from_view=search&track=sph">Image by storyset</a> on Freepik
    image: "images/g2_image.jpg",
  },
};

//a function that returns data based on name parameter from above list
function getCategory(name) {
  for (const key of Object.keys(categoryList))
    if (key === name) return categoryList[key];
}
//exporting category method
module.exports = { getCategory };
