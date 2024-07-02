import {
    constantUsersPerSec,
    scenario,
    simulation,
    rampUsers
  } from "@gatling.io/core";
  import { http } from "@gatling.io/http";
  
  export default simulation((setUp) => {
  
    const httpProtocol =
      http.baseUrl("https://computer-database.gatling.io")
        .acceptHeader("application/json")
        .contentTypeHeader("application/json");
  
    const myFirstScenario = scenario("First_Scenario")
      .exec(http("Request-1")
        .get("/computers/"));

    const mySecondScenario = scenario(`Second_scenario`)
      .exec(http(`Request-2`)
      .get(`/computers/`))
  
    setUp(
        myFirstScenario.injectOpen(constantUsersPerSec(2).during(60)),
        mySecondScenario.injectOpen(rampUsers(10).during(5))
    ).protocols(httpProtocol);
  });