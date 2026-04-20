-- B"H

CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    category    VARCHAR(255),
    price       DECIMAL(10, 2) NOT NULL,
    brand       VARCHAR(255),
    thumbnail   VARCHAR(500),
    tags        TEXT[],
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE product_images (
    id         SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    image_url  VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_reviews (
    id             SERIAL PRIMARY KEY,
    product_id     INT NOT NULL,
    rating         INT NOT NULL,
    comment        TEXT,
    date           DATE,
    reviewer_name  VARCHAR(255),
    reviewer_email VARCHAR(255),
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    gender      VARCHAR(50),
    email       VARCHAR(255) NOT NULL,
    phone       VARCHAR(50),
    birth_date  DATE,
    image       VARCHAR(500),
    role        VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
    address     VARCHAR(500),
    city        VARCHAR(255),
    state       VARCHAR(255),
    state_code  VARCHAR(10),
    postal_code VARCHAR(20),
    country     VARCHAR(255),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_items (
    id         SERIAL PRIMARY KEY,
    user_id    INT NOT NULL,
    product_id INT NOT NULL,
    quantity   INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
