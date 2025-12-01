
# Mooni Candles – E-Commerce Platform

## Class Diagram


* A class diagram is a structural diagram in Unified Modeling Language (UML) that shows the static structure of a system by depicting classes, their attributes, methods, and relationships.

* Class diagrams visualize the blueprint of an object-oriented system before implementation begins.

* Class diagrams consist of classes (represented as rectangles), attributes (data fields), methods (functions), and relationships (lines connecting classes).

* When applied to database design, class diagrams represent tables as classes, columns as attributes, and foreign key relationships as associations.

* Primary Keys (PK): Uniquely identify each record in a table and are underlined or marked with "PK" notation.
* Foreign Keys (FK): Reference primary keys in other tables, establishing relationships between entities and marked with "FK" notation.

* Specify the kind of data each attribute holds (VARCHAR for text, INT for integers, etc.).

* Lines connecting classes show how entities relate (one-to-one, one-to-many, many-to-many associations).

* Indicates how many instances of one entity relate to instances of another (e.g., one user has many orders).

![alt text](<MOONI CANDLES E-COMMERCE PLATFORM CLASS DIAGRAM.png>)

Mooni Candles E-Commerce Platform Class Diagram Analysis

## Core Entities

### USER Table

Stores customer account information including credentials, contact details, and preferences for wax and scent types.

USER (userid, name, email, password, phoneno, dob, preffered_wax, preffered_scent)

### ADDRESS Table

Contains shipping and billing address information linked to users through userid foreign key.

ADDRESS (addressid, userid, label, line1, line2, city, state, country, postal_code)

### PRODUCT Table

Maintains catalog of candle products with basic attributes like name, image, type, and wax characteristics.

PRODUCT (productid, product_name, imageurl, candle_type, wax_type, scent_type, container_type)

### PRODUCT_VARIANT Table

Stores specific variations of products with details on dimensions, wax amount, wick, container specifications, and inventory levels.

PRODUCT_VARIANT (product_variantid, productid, product_variant_name, height_width_inches, wax_amount_oz, wick_type, container_color, wax_base_color, burn_time_hours, stock_quantity, low_stock_threshold)

### CUSTOM_DESIGN Table

Captures user-created custom candle designs with personalized attributes for container, wax, scent, and wick preferences.

CUSTOM_DESIGN (customizationid, userid, message_on_container, ai_generated_image, candle_type, wax_type, wax_base_color, scent_type, container_type, container_mould_type, container_color, height_width_inches, wax_amount_oz, wick_type, quantity, price, burn_time_hours, topper_mould_type, topper_wax_color)

### CART Table

Manages shopping cart functionality linking users to product variants and custom designs with quantity tracking.

CART (cartid, user_id, customization_id, product_variant_id, quantity, cart_status)

### ORDER Table

Records completed purchases with user, address, cart reference, pricing breakdown, and fulfillment status.

ORDER (orderid, userid, addressid, cartid, order_created_at, order_status, subtotal_amount, tax_amount, shipment_amount, total_amount, shipment_location)

### PAYMENT Table

Handles transaction records associated with orders including payment method, status, and currency information.

PAYMENT (paymentid, orderid, payment_status, payment_method, currency, payment_msg)

### REVIEW Table

Stores customer feedback on products and orders with ratings and text comments.

REVIEW (reviewid, userid, productid, orderid, rating, title, body)