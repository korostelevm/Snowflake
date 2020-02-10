Feature: The API is Stable
  @acceptance
    Scenario: Request received with proper header
      When The service responds to health checks in less than 60 seconds
      Then I receive a 200 status code

