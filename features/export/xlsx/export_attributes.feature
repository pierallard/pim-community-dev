@javascript
Feature: Export attributes in XLSX
  In order to be able to access and modify attributes data outside PIM
  As a product manager
  I need to be able to export attributes in XLSX

  Background:
    Given a "footwear" catalog configuration
    And I am logged in as "Julia"

  Scenario: Successfully export attributes in XLSX
    Given the following job "xlsx_footwear_attribute_export" configuration:
      | filePath | %tmp%/attribute_export/attribute_export.xlsx |
    And I am on the "xlsx_footwear_attribute_export" export job page
    When I launch the export job
    And I wait for the "xlsx_footwear_attribute_export" job to finish
    Then exported xlsx file of "xlsx_footwear_attribute_export" should contain:
      | type                            | code               | label-en_US        | label-fr_FR        | group     | unique | useable_as_grid_filter | allowed_extensions | metric_family | default_metric_unit | reference_data_name | available_locales | max_characters | validation_rule | validation_regexp | wysiwyg_enabled | number_min | number_max | decimals_allowed | negative_allowed | date_min | date_max | max_file_size | minimum_input_length | localizable | scopable | sort_order | is_read_only |
      | pim_catalog_identifier          | sku                | SKU                |                    | info      | 1      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_text                | name               | Name               |                    | info      | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | manufacturer       | Manufacturer       |                    | info      | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_multiselect         | weather_conditions | Weather conditions |                    | info      | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_textarea            | description        | Description        |                    | info      | 0      | 1                      |                    |               |                     |                     |                   | 1000           |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 1        | 0          | 0            |
      | pim_catalog_text                | comment            | Comment            |                    | other     | 0      | 1                      |                    |               |                     |                     |                   | 255            |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_price_collection    | price              | Price              |                    | marketing | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 | 1.0000     | 200.0000   | 1                |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | rating             | Rating             |                    | marketing | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_image               | side_view          | Side view          |                    | media     | 0      | 0                      | gif,png,jpeg,jpg   |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          | 1.00          | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_image               | top_view           | Top view           |                    | media     | 0      | 0                      | gif,png,jpeg,jpg   |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          | 1.00          | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | size               | Size               |                    | sizes     | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | color              | Color              |                    | colors    | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | lace_color         | Lace color         |                    | colors    | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_metric              | length             | Length             |                    | info      | 0      | 0                      |                    | Length        | CENTIMETER          |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_metric              | volume             | Volume             |                    | info      | 0      | 0                      |                    | Volume        | CUBIC_MILLIMETER    |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_number              | number_in_stock    | Number in stock    |                    | other     | 0      | 0                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_date                | destocking_date    | Destocking date    | Date de déstockage | other     | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_boolean             | handmade           | Handmade           |                    | other     | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_simpleselect | heel_color         | Heel color         |                    | other     | 0      | 1                      |                    |               |                     | color               |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_simpleselect | sole_color         | Sole color         |                    | other     | 0      | 1                      |                    |               |                     | color               |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_simpleselect | cap_color          | Cap color          |                    | other     | 0      | 1                      |                    |               |                     | color               |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 1        | 0          | 0            |
      | pim_reference_data_multiselect  | sole_fabric        | Sole fabric        |                    | other     | 0      | 1                      |                    |               |                     | fabrics             |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_multiselect  | lace_fabric        | Lace fabric        |                    | other     | 0      | 1                      |                    |               |                     | fabrics             |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 1        | 0          | 0            |
      | pim_catalog_number              | rate_sale          | Rate of sale       | Taux de vente      | marketing | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            | 1                |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_metric              | weight             | Weight             | Poids              | info      | 0      | 1                      |                    | Weight        | GRAM                |                     |                   | 0              |                 |                   |                 |            |            | 1                |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_text                | 123                | Attribute 123      |                    | other     | 0      | 1                      |                    |               |                     |                     |                   | 255            |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |

  Scenario: Successfully export all label locales even if no value were set in XLSX
    Given the following job "xlsx_footwear_attribute_export" configuration:
      | filePath | %tmp%/attribute_export/attribute_export.xlsx |
    And I add the "fr_BE" locale to the "tablet" channel
    And I am on the "xlsx_footwear_attribute_export" export job page
    When I launch the export job
    And I wait for the "xlsx_footwear_attribute_export" job to finish
    Then exported xlsx file of "xlsx_footwear_attribute_export" should contain:
      | type                            | code               | label-en_US        | label-fr_FR        | label-fr_BE | group     | unique | useable_as_grid_filter | allowed_extensions | metric_family | default_metric_unit | reference_data_name | available_locales | max_characters | validation_rule | validation_regexp | wysiwyg_enabled | number_min | number_max | decimals_allowed | negative_allowed | date_min | date_max | max_file_size | minimum_input_length | localizable | scopable | sort_order | is_read_only |
      | pim_catalog_identifier          | sku                | SKU                |                    |             | info      | 1      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_text                | name               | Name               |                    |             | info      | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | manufacturer       | Manufacturer       |                    |             | info      | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_multiselect         | weather_conditions | Weather conditions |                    |             | info      | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_textarea            | description        | Description        |                    |             | info      | 0      | 1                      |                    |               |                     |                     |                   | 1000           |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 1        | 0          | 0            |
      | pim_catalog_text                | comment            | Comment            |                    |             | other     | 0      | 1                      |                    |               |                     |                     |                   | 255            |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_price_collection    | price              | Price              |                    |             | marketing | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 | 1.0000     | 200.0000   | 1                |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | rating             | Rating             |                    |             | marketing | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_image               | side_view          | Side view          |                    |             | media     | 0      | 0                      | gif,png,jpeg,jpg   |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          | 1.00          | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_image               | top_view           | Top view           |                    |             | media     | 0      | 0                      | gif,png,jpeg,jpg   |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          | 1.00          | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | size               | Size               |                    |             | sizes     | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | color              | Color              |                    |             | colors    | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_simpleselect        | lace_color         | Lace color         |                    |             | colors    | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_metric              | length             | Length             |                    |             | info      | 0      | 0                      |                    | Length        | CENTIMETER          |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_metric              | volume             | Volume             |                    |             | info      | 0      | 0                      |                    | Volume        | CUBIC_MILLIMETER    |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_number              | number_in_stock    | Number in stock    |                    |             | other     | 0      | 0                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_date                | destocking_date    | Destocking date    | Date de déstockage |             | other     | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_boolean             | handmade           | Handmade           |                    |             | other     | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_simpleselect | heel_color         | Heel color         |                    |             | other     | 0      | 1                      |                    |               |                     | color               |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_simpleselect | sole_color         | Sole color         |                    |             | other     | 0      | 1                      |                    |               |                     | color               |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_simpleselect | cap_color          | Cap color          |                    |             | other     | 0      | 1                      |                    |               |                     | color               |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 1        | 0          | 0            |
      | pim_reference_data_multiselect  | sole_fabric        | Sole fabric        |                    |             | other     | 0      | 1                      |                    |               |                     | fabrics             |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_reference_data_multiselect  | lace_fabric        | Lace fabric        |                    |             | other     | 0      | 1                      |                    |               |                     | fabrics             |                   | 0              |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 1           | 1        | 0          | 0            |
      | pim_catalog_number              | rate_sale          | Rate of sale       | Taux de vente      |             | marketing | 0      | 1                      |                    |               |                     |                     |                   | 0              |                 |                   |                 |            |            | 1                |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_metric              | weight             | Weight             | Poids              |             | info      | 0      | 1                      |                    | Weight        | GRAM                |                     |                   | 0              |                 |                   |                 |            |            | 1                |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |
      | pim_catalog_text                | 123                | Attribute 123      |                    |             | other     | 0      | 1                      |                    |               |                     |                     |                   | 255            |                 |                   |                 |            |            |                  |                  |          |          |               | 0                    | 0           | 0        | 0          | 0            |

  @ce
  Scenario: Export attributes with a predefine order
    Given the following job "xlsx_footwear_attribute_export" configuration:
      | filePath | %tmp%/attribute_export/attribute_export.xlsx |
    When I am on the "xlsx_footwear_attribute_export" export job page
    And I launch the export job
    And I wait for the "xlsx_footwear_attribute_export" job to finish
    Then exported xlsx file of "xlsx_footwear_attribute_export" should contains the following headers:
      | code | label-fr_FR | label-en_US | allowed_extensions | available_locales | date_max | date_min | decimals_allowed | default_metric_unit | group | localizable | max_characters | max_file_size | metric_family | minimum_input_length | negative_allowed | number_max | number_min | reference_data_name | scopable | sort_order | type | unique | useable_as_grid_filter | validation_regexp | validation_rule | wysiwyg_enabled |

  @ce
  Scenario: Successfully export associations into several files
    Given the following job "xlsx_footwear_attribute_export" configuration:
      | filePath     | %tmp%/xlsx_footwear_attribute_export/xlsx_footwear_attribute_export.xlsx |
      | linesPerFile | 2                                                                        |
    When I am on the "xlsx_footwear_attribute_export" export job page
    And I launch the export job
    And I wait for the "xlsx_footwear_attribute_export" job to finish
    And I press the secondary action "Download generated files"
    Then I should see the text "xlsx_footwear_attribute_export_1.xlsx"
    And I should see the text "xlsx_footwear_attribute_export_2.xlsx"
    And I should see the text "xlsx_footwear_attribute_export_3.xlsx"
    And exported xlsx file 1 of "xlsx_footwear_attribute_export" should contain:
      | code | label-fr_FR | label-en_US | allowed_extensions | available_locales | date_max | date_min | decimals_allowed | default_metric_unit | group | localizable | max_characters | max_file_size | metric_family | minimum_input_length | negative_allowed | number_max | number_min | reference_data_name | scopable | sort_order | type                   | unique | useable_as_grid_filter | validation_regexp | validation_rule | wysiwyg_enabled |
      | sku  |             | SKU         |                    |                   |          |          |                  |                     | info  | 0           |                |               |               | 0                    |                  |            |            |                     | 0        | 1          | pim_catalog_identifier | 1      | 1                      |                   |                 |                 |
      | name |             | Name        |                    |                   |          |          |                  |                     | info  | 1           |                |               |               | 0                    |                  |            |            |                     | 0        | 2          | pim_catalog_text       | 0      | 1                      |                   |                 |                 |
    And exported xlsx file 2 of "xlsx_footwear_attribute_export" should contain:
      | code               | label-fr_FR | label-en_US        | allowed_extensions | available_locales | date_max | date_min | decimals_allowed | default_metric_unit | group | localizable | max_characters | max_file_size | metric_family | minimum_input_length | negative_allowed | number_max | number_min | reference_data_name | scopable | sort_order | type                     | unique | useable_as_grid_filter | validation_regexp | validation_rule | wysiwyg_enabled |
      | manufacturer       |             | Manufacturer       |                    |                   |          |          |                  |                     | info  | 0           |                |               |               | 0                    |                  |            |            |                     | 0        | 3          | pim_catalog_simpleselect | 0      | 1                      |                   |                 |                 |
      | weather_conditions |             | Weather conditions |                    |                   |          |          |                  |                     | info  | 0           |                |               |               | 0                    |                  |            |            |                     | 0        | 4          | pim_catalog_multiselect  | 0      | 1                      |                   |                 |                 |
