Feature: Order

  Scenario: Delete a Order but the Order doesnt exist
    Given I request "DELETE" "/orders/:id"
    When I send a request with the following body:
      | id    |
      | 42069 |
    Then I should get a response with status code "500"

  Scenario: Delete a Order that exists
    Given I request "DELETE" "/orders/:id"
    When I send a request with the following body:
      | id |
      | 1  |
    Then I should get a response with status code "200"
    And the Order should be deleted

  Scenario: Update a Order but the Order doesnt exist and i have a valid payload
    Given I request "PUT" "/orders/:id"
    When I send the request with the following body:
      | name           | price |
      | "Cheeseburger" | 5.00  |
    Then I should get a response with status code "500"

  Scenario: Update a Order but the Order doesnt exist and and an invalid payload
    Given I request "PUT" "/orders/:id"
    When I send the request with the following body:
      | name | price        |
      | 10.0 | ChiseBourger |
    Then I should get a response with status code "500"

  Scenario: Update a Order with a valid payload and the Order exists
    Given I request "PUT" "/orders/:id"
    When I send the request with the following body:
      | name         | price |
      | Cheeseburger | 5.00  |
    Then I should get a response with status code "200"
    And the response should be:
      | name         | price |
      | Cheeseburger | 5.00  |

  Scenario: Update a Order with a unvalid payload and the Order exists
    Given I request "PUT" "/orders/:id"
    When I send the request with the following body:
      | name | price        |
      | 5.00 | ChiseBourger |
    Then I should get a response with status code "500"

  Scenario: Get all Orders but there is no Orders
    When I request "GET" "/orders"
    Then I should receive an empty array
    And the response status should be 200
    And I should receive a an array with 0 elements

  Scenario: Get all Orders and there are some Orders
    When I request "GET" "/orders"
    Then I should receive an array with all the Orders
    And the response status should be 200
    And I should receive a an array with all the Orders

  Scenario: Create a Order with a valid payload
    When I request "POST" "/orders" with a payload
      | name           | price |
      | "MagBourgueur" | 10    |
    Then I should get a response with status code "201"
    And I should receive a Order with the same attributes as the payload
      | name           | price |
      | "MagBourgueur" | 10    |

  Scenario: Create a Order with an invalid payload
    When I request "POST" "/orders" with a payload
      | name     | price |
      | Bourgeur | "10"  |
    Then I should get a response with status code "500"
