import {
    simulation,
    scenario,
    exec,
    csv,
    pause,
    css,
    feed,
    repeat,
    rampUsers
} from "@gatling.io/core";
import {
    http,
    status
} from "@gatling.io/http";

export default simulation((setUp)=>{
    const dataFeeder = csv("search.csv").random();

    const searchMethod = exec(
            http(`HomePage`)
            .get(`/`),
            pause(1),
            feed(dataFeeder),
            http(`Search`)
            .get(`/computers?f=#{searchCriterion}`)
            .check(css("a:contains('#{searchComputerName}')","href").saveAs("computerURL")),
            pause(1),
            http(`SelectProduct`).get("#{computerURL}").check(status().is(200)),
            pause(1)
    );

    const checkItem = repeat(4,"i").on(http(`Page #{i}`).get(`/computers?p=#{i}`), pause(1));

    const httpProtocol = http
            .baseUrl(`https://computer-database.gatling.io`)
            .acceptHeader(`ext/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`)
            .acceptLanguageHeader(`en-US,en;q=0.5`)
            .acceptEncodingHeader(`gzip, deflate`)
            .userAgentHeader(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`);

    const normalUser = scenario(`NormalUserSearch`).exec(searchMethod,checkItem);

    setUp(
        normalUser.injectOpen(rampUsers(15).during(10))
    ).protocols(httpProtocol);

});

