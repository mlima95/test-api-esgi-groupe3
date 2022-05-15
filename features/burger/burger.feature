Feature: Burger

  Scenario: Delete a Burger but the Burger doesnt exist
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "DELETE" "/burgers/42069"
    Then I should get a response with status code 500

  Scenario: Delete a Burger that exists
    Given I load fixtures "user.json,burger.json"
    And I am authenticated as "ADMIN"
    When I request "DELETE" "/burgers/{{bigmac1.id}}"
    Then I should get a response with status code 200

  Scenario: Update a Burger but the Burger doesnt exist and i have a valid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | "Cheeseburger" |
      | price          | 5              |
    When I request "PUT" "/burgers/5"
    Then I should get a response with status code 404

  Scenario: Update a Burger but the Burger doesnt exist and and an invalid payload
    Given I load fixtures "user.json,burger.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | "Cheeseburger" |
      | price          | "5"            |
    When I request "PUT" "/burgers/22"
    Then I should get a response with status code 404

  Scenario: Update a Burger with a valid payload and the Burger exists
    Given I load fixtures "user.json,burger.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | "Cheeseburger" |
      | price          | 5              |
    When I request "PUT" "/burgers/{{bigmac1.id}}"
    Then I should get a response with status code 200
    And I should receive an element with the following attributes
      | name          | "Cheeseburger" |

  Scenario: Update a Burger with a unvalid payload and the Burger exists
    Given I load fixtures "user.json,burger.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | "Cheeseburger" |
      | price          | "5"            |
    When I request "PUT" "/burgers/{{bigmac1.id}}"
    Then I should get a response with status code 500

  Scenario: Get all Burgers but there is no Burgers
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "GET" "/burgers"
    Then I should receive an empty array
    And I should get a response with status code 200
    And I should receive a an array with 0 elements

  Scenario: Get all Burgers and there are some Burgers
    Given I load fixtures "user.json,burger.json"
    And I am authenticated as "ADMIN"
    When I request "GET" "/burgers"
    Then I should get a response with status code 200
    And I should have an array with 2 elements

  Scenario: Create a Burger with a valid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | "Cheeseburger" |
      | price          | 5              |
    When I request "POST" "/burgers"
    And I should get a response with status code 201
    Then I should receive an element with the following attributes
      | name          | "Cheeseburger"  |

  Scenario: Create a Burger with an invalid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | name           | "Cheeseburger" |
      | price          | "5"             |
    When I request "POST" "/burgers"
    And I should get a response with status code 500
