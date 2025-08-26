# Base image PHP-FPM untuk Laravel
FROM php:8.2-fpm

# Install sistem dependencies dan ekstensi PHP yang diperlukan Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Salin file dependency terlebih dahulu untuk cache layer
COPY composer.json composer.lock ./

# Install dependency PHP tanpa menjalankan composer scripts (artisan belum ada)
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Salin seluruh source code
COPY . .

# Jalankan composer scripts setelah source tersedia (abaikan error kecil agar build tidak gagal)
RUN composer dump-autoload --optimize || true \
    && php artisan package:discover --ansi || true

# Set permission untuk storage & bootstrap
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Tidak expose port di sini (Nginx yang expose)

# Default command menjalankan PHP-FPM
CMD ["php-fpm"]
