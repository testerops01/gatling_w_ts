import {
    constantUsersPerSec,
    scenario,
    simulation
  } from "@gatling.io/core";
  import { http } from "@gatling.io/http";
  
  export default simulation((setUp) => {
  
    const httpProtocol =
      http.baseUrl("https://computer-database.gatling.io")
        .acceptHeader("application/json")
        .contentTypeHeader("application/json");
  
    const myScenario = scenario("My Scenario")
      .exec(http("Request 1")
        .get("/computers/"));
  
    setUp(
      myScenario.injectOpen(constantUsersPerSec(2).during(60))
    ).protocols(httpProtocol);
  });