Feature: Order

  Scenario: Delete a Order but the Order doesnt exist
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "DELETE" "/orders/42069"
    Then I should get a response with status code 500

  Scenario: Delete a Order that exists
    Given I load fixtures "user.json,order.json"
    And I am authenticated as "ADMIN"
    When I request "DELETE" "/orders/{{order1.id}}"
    Then I should get a response with status code 200

  Scenario: Update a Order but the Order doesnt exist and i have a valid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | price |
      | "Cheeseburger" | 5.00  |
    When I request "PUT" "/orders/5"
    Then I should get a response with status code 404

  Scenario: Update a Order but the Order doesnt exist and and an invalid payload
    Given I load fixtures "user.json,order.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | "5"              |
    When I request "PUT" "/orders/22"
    Then I should get a response with status code 404

  Scenario: Update a Order with a valid payload and the Order exists
    Given I load fixtures "user.json,order.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | 5.00             |
    When I request "PUT" "/orders/{{order1.id}}"
    Then I should get a response with status code 200
    And I should receive an element with the following attributes
      | burgers          | ['Cheeseburger'] |

  Scenario: Update a Order with a unvalid payload and the Order exists
    Given I load fixtures "user.json,order.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | "5"              |
    When I request "PUT" "/orders/{{order1.id}}"
    Then I should get a response with status code 500

  Scenario: Get all Orders but there is no Orders
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "GET" "/orders"
    Then I should receive an empty array
    And I should get a response with status code 200
    And I should receive a an array with 0 elements

  Scenario: Get all Orders and there are some Orders
    Given I load fixtures "user.json,order.json"
    And I am authenticated as "ADMIN"
    When I request "GET" "/orders"
    Then I should get a response with status code 200
    And I should have an array with 2 elements

  Scenario: Create a Order with a valid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | 5                |
    When I request "POST" "/orders"
    And I should get a response with status code 201
    Then I should receive an element with the following attributes
      | burgers          | ['Cheeseburger'] |

  Scenario: Create a Order with an invalid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | "5"              |
    When I request "POST" "/orders"
    And I should get a response with status code 500

  Scenario: Delete a Order but without token
    When I request "DELETE" "/orders/42069"
    Then I should get a response with status code 401

  Scenario: Update a Order but without token
    Given I send a request with the following body:
      | name           | price |
      | "Cheeseburger" | 5.00  |
    When I request "PUT" "/orders/5"
    Then I should get a response with status code 401

  Scenario: Get all Orders but there is no Orders
    When I request "GET" "/orders"
    Then I should get a response with status code 401

  Scenario: Create a Order with a valid payload
    Given I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | 5                |
    When I request "POST" "/orders"
    Then I should get a response with status code 401

  Scenario: Delete a Order as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    When I request "DELETE" "/orders/42069"
    Then I should get a response with status code 401

  Scenario: Update a Order as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    And I send a request with the following body:
      | name           | price |
      | "Cheeseburger" | 5.00  |
    When I request "PUT" "/orders/5"
    Then I should get a response with status code 401

  Scenario: Get all Orders as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    When I request "GET" "/orders"
    Then I should get a response with status code 200

  Scenario: Create a Order as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    And I send a request with the following body:
      | burgers          | ['Cheeseburger'] |
      | total            | 5                |
    When I request "POST" "/orders"
    Then I should get a response with status code 401
