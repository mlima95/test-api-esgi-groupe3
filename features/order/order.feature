Feature: Burger

  Scenario: Delete a Burger but the Burger doesnt exist
    Given I request "DELETE" "/burgers/:id"
    When I send a request with the following body:
      | id    |
      | 42069 |
    Then I should get a response with status code "500"

  Scenario: Delete a Burger that exists
    Given I request "DELETE" "/burgers/:id"
    When I send a request with the following body:
      | id |
      | 1  |
    Then I should get a response with status code "200"
    And the Burger should be deleted

  Scenario: Update a Burger but the Burger doesnt exist and i have a valid payload
    Given I request "PUT" "/burgers/:id"
    When I send the request with the following body:
      | name           | price |
      | "Cheeseburger" | 5.00  |
    Then I should get a response with status code "500"

  Scenario: Update a Burger but the Burger doesnt exist and and an invalid payload
    Given I request "PUT" "/burgers/:id"
    When I send the request with the following body:
      | name | price        |
      | 10.0 | ChiseBourger |
    Then I should get a response with status code "500"

  Scenario: Update a Burger with a valid payload and the Burger exists
    Given I request "PUT" "/burgers/:id"
    When I send the request with the following body:
      | name         | price |
      | Cheeseburger | 5.00  |
    Then I should get a response with status code "200"
    And the response should be:
      | name         | price |
      | Cheeseburger | 5.00  |

  Scenario: Update a Burger with a unvalid payload and the Burger exists
    Given I request "PUT" "/burgers/:id"
    When I send the request with the following body:
      | name | price        |
      | 5.00 | ChiseBourger |
    Then I should get a response with status code "500"

  Scenario: Get all Burgers but there is no Burgers
    When I request "GET" "/burgers"
    Then I should receive an empty array
    And the response status should be 200
    And I should receive a an array with 0 elements

  Scenario: Get all Burgers and there are some Burgers
    When I request "GET" "/burgers"
    Then I should receive an array with all the Burgers
    And the response status should be 200
    And I should receive a an array with all the Burgers

  Scenario: Create a Burger with a valid payload
    When I request "POST" "/burgers" with a payload
      | name           | price |
      | "MagBourgueur" | 10    |
    Then I should get a response with status code "201"
    And I should receive a Burger with the same attributes as the payload
      | name           | price |
      | "MagBourgueur" | 10    |

  Scenario: Create a Burger with an invalid payload
    When I request "POST" "/burgers" with a payload
      | name     | price |
      | Bourgeur | "10"  |
    Then I should get a response with status code "500"