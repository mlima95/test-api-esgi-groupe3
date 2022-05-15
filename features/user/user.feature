Feature: User

  Scenario: Delete a User but the User doesnt exist
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "DELETE" "/users/42069"
    Then I should get a response with status code 500

  Scenario: Delete a User that exists
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "DELETE" "/users/{{ADMIN.id}}"
    Then I should get a response with status code 200

  Scenario: Update a User but the User doesnt exist and i have a valid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "PUT" "/users/5"
    Then I should get a response with status code 404

  Scenario: Update a User but the User doesnt exist and and an invalid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | username           | "test" |
    When I request "PUT" "/users/22"
    Then I should get a response with status code 404

  Scenario: Update a User with a valid payload and the User exists
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "PUT" "/users/{{ADMIN.id}}"
    Then I should get a response with status code 200
    And I should receive an element with the following attributes
      | username           | "test" |

  Scenario: Update a User with a unvalid payload and the User exists
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | username           | "test" |
    When I request "PUT" "/users/{{ADMIN.id}}"
    Then I should get a response with status code 500

  Scenario: Get all Users and there are some Users
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    When I request "GET" "/users"
    Then I should get a response with status code 200
    And I should have an array with 2 elements

  Scenario: Create a User with a valid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "POST" "/users"
    And I should get a response with status code 201
    Then I should receive an element with the following attributes
      | username          | "test"  |

  Scenario: Create a User with an invalid payload
    Given I load fixtures "user.json"
    And I am authenticated as "ADMIN"
    And I send a request with the following body:
      | username           | "test" |
    When I request "POST" "/users"
    And I should get a response with status code 500

  Scenario: Delete a User but without token
    When I request "DELETE" "/users/42069"
    Then I should get a response with status code 401

  Scenario: Update a User but without token
    Given I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "PUT" "/users/5"
    Then I should get a response with status code 401

  Scenario: Get all Users but without token
    When I request "GET" "/users"
    Then I should get a response with status code 401

  Scenario: Create a User but without token
    Given I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "POST" "/users"
    And I should get a response with status code 201
    Then I should receive an element with the following attributes
      | username          | "test"  |

  Scenario: Delete a User as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    When I request "DELETE" "/users/42069"
    Then I should get a response with status code 401

  Scenario: Update a User as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    And I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "PUT" "/users/5"
    Then I should get a response with status code 401

  Scenario: Get all Users as user
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    When I request "GET" "/users"
    Then I should get a response with status code 200

  Scenario: Create a User but without token
    Given I load fixtures "user.json"
    And I am authenticated as "USER"
    And I send a request with the following body:
      | username           | "test" |
      | password           | "1234" |
    When I request "POST" "/users"
    And I should get a response with status code 201
    Then I should receive an element with the following attributes
      | username          | "test"  |

