Feature: User

  Scenario: Delete a User but the User doesnt exist
    Given I request "DELETE" "/users/:id"
    When I send a request with the following body:
      | id    |
      | 42069 |
    Then I should get a response with status code "500"

  Scenario: Delete a User that exists
    Given I request "DELETE" "/users/:id"
    When I send a request with the following body:
      | id |
      | 1  |
    Then I should get a response with status code "200"
    And the User should be deleted

  Scenario: Update a User but the User doesnt exist and i have a valid payload
    Given I request "PUT" "/users/:id"
    When I send the request with the following body:
      | username           |
      | "Germaine" |
    Then I should get a response with status code "500"

  Scenario: Update a User but the User doesnt exist and and an invalid payload
    Given I request "PUT" "/users/:id"
    When I send the request with the following body:
      | username | price        |
      | 10.0 | Germain |
    Then I should get a response with status code "500"

  Scenario: Update a User with a valid payload and the User exists
    Given I request "PUT" "/users/:id"
    When I send the request with the following body:
      | username         | price |
      | Germaine | 5.00  |
    Then I should get a response with status code "200"
    And the response should be:
      | username         | price |
      | Germaine | 5.00  |

  Scenario: Update a User with a unvalid payload and the User exists
    Given I request "PUT" "/users/:id"
    When I send the request with the following body:
      | username | price        |
      | 5.00 | Germain |
    Then I should get a response with status code "500"

  Scenario: Get all Users but there is no Users
    When I request "GET" "/users"
    Then I should receive an empty array
    And the response status should be 200
    And I should receive a an array with 0 elements

  Scenario: Get all Users and there are some Users
    When I request "GET" "/users"
    Then I should receive an array with all the Users
    And the response status should be 200
    And I should receive a an array with all the Users

  Scenario: Create a User with a valid payload
    When I request "POST" "/users" with a payload
      | username|
      | "Roger" |
    Then I should get a response with status code "201"
    And I should receive a User with the same attributes as the payload
      | username |
      | "Roger" |

  Scenario: Create a User with an invalid payload
    When I request "POST" "/users" with a payload
      | username |
      | Roger |
    Then I should get a response with status code "500"

  Scenario: Get a certain User but the User doesnt exist
    When I request "GET" "/user/85"
    Then I should get a response with status code "500"

  Scenario: Get a certain User and the User exists
    When I request "GET" "/user/1"
    Then I should get a response with status code "200"
    And I should receive a User with its attributes
      | id | username |
      | 1 | "Roger" |
