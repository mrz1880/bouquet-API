-- Revert bouquet-API:appschema from pg

BEGIN;

DROP TABLE "customer", "seller", "product", "order", "image", "category", "order_has_product";

COMMIT;
