Feature: is the User connected ?
  Scenario: You want to know if the User is connected
    Given the User is on the login page
    And the User enters proper credentials
    Then the User should be connected


# We check if the user is connected
# If he is, we redirect him on the command page
# If not, we redirect him on the login page

Feature: can the User make a Command ?
  Scenario: You want to know if the User can make a Command
    Given the User is connected
    And the User is connected
    When the User register his Command
    But there is no Burger in this Command
    Then return an error (404)

Feature: can the User make a proper Command ?
  Scenario: You want to know if the User can make a proper Command with 3 burgers
    Given the User is connected
    When the User register his Command
    And the Command has 3 burgers
    Then the Command should be created

