-- Esquema SQL para Supabase PostgreSQL con analítica pasiva
-- XocoCafe Database Schema

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios con campos de analítica pasiva
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    client_id VARCHAR(255) UNIQUE DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(255),
    auth_provider VARCHAR(50) DEFAULT 'email',
    google_id VARCHAR(255),
    
    -- Información personal
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    
    -- Consentimientos GDPR
    terms_accepted BOOLEAN DEFAULT false,
    privacy_accepted BOOLEAN DEFAULT false,
    marketing_email BOOLEAN DEFAULT false,
    marketing_sms BOOLEAN DEFAULT false,
    marketing_push BOOLEAN DEFAULT false,
    consent_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Campos de analítica pasiva
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    data_retention_until TIMESTAMP WITH TIME ZONE,
    
    -- Metadatos de analítica
    registration_source VARCHAR(100), -- 'email', 'google', 'referral', etc.
    user_agent TEXT,
    ip_address INET,
    referrer_url TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    
    -- Métricas de comportamiento
    total_sessions INTEGER DEFAULT 0,
    total_page_views INTEGER DEFAULT 0,
    avg_session_duration INTEGER DEFAULT 0, -- en segundos
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Segmentación
    user_segment VARCHAR(50), -- 'new', 'active', 'vip', 'churned'
    acquisition_channel VARCHAR(100),
    lifetime_value DECIMAL(10,2) DEFAULT 0.00
);

-- Tabla de direcciones
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'home', 'work', 'billing', 'shipping'
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de órdenes con analítica
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL, -- 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
    total DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Analítica de órdenes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    -- Métricas de conversión
    conversion_source VARCHAR(100),
    cart_abandonment_recovered BOOLEAN DEFAULT false,
    discount_applied DECIMAL(5,2) DEFAULT 0.00,
    shipping_cost DECIMAL(8,2) DEFAULT 0.00,
    
    -- Datos de envío
    shipping_address_id UUID REFERENCES addresses(id),
    billing_address_id UUID REFERENCES addresses(id)
);

-- Tabla de items de órdenes
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_category VARCHAR(100),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de puntos de lealtad con analítica
CREATE TABLE loyalty_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    reason VARCHAR(255) NOT NULL, -- 'purchase', 'referral', 'review', 'birthday', etc.
    order_id UUID REFERENCES orders(id),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Analítica de lealtad
    point_source VARCHAR(100), -- 'organic', 'promotional', 'referral'
    multiplier DECIMAL(3,2) DEFAULT 1.00
);

-- Tabla de sesiones con analítica detallada
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Analítica de sesión
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
    browser VARCHAR(100),
    os VARCHAR(100),
    country VARCHAR(100),
    city VARCHAR(100),
    session_duration INTEGER DEFAULT 0, -- en segundos
    page_views INTEGER DEFAULT 0,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de logs de retención de datos (GDPR)
CREATE TABLE data_retention_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, -- 'export', 'delete', 'update', 'consent_change'
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Metadatos de la acción
    ip_address INET,
    user_agent TEXT,
    admin_user_id UUID REFERENCES users(id)
);

-- Tabla de analítica de páginas (analítica pasiva)
CREATE TABLE page_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    
    -- Datos de la página
    page_path VARCHAR(500) NOT NULL,
    page_title VARCHAR(255),
    page_category VARCHAR(100),
    
    -- Métricas de comportamiento
    time_on_page INTEGER DEFAULT 0, -- en segundos
    scroll_depth INTEGER DEFAULT 0, -- porcentaje
    bounce BOOLEAN DEFAULT false,
    exit_page BOOLEAN DEFAULT false,
    
    -- Datos técnicos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    referrer_url TEXT,
    
    -- Datos de conversión
    conversion_event VARCHAR(100), -- 'signup', 'purchase', 'download', etc.
    conversion_value DECIMAL(10,2)
);

-- Tabla de eventos de conversión
CREATE TABLE conversion_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    
    event_type VARCHAR(100) NOT NULL, -- 'signup', 'login', 'purchase', 'newsletter_signup', etc.
    event_category VARCHAR(100), -- 'engagement', 'conversion', 'retention'
    event_value DECIMAL(10,2),
    
    -- Datos del evento
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Datos técnicos
    ip_address INET,
    user_agent TEXT,
    page_path VARCHAR(500)
);

-- Tabla de productos para analítica
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2),
    
    -- Métricas de producto
    total_sales INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    avg_rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    
    -- Datos de inventario
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    
    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Tabla de reseñas con analítica
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id),
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    
    -- Métricas de reseña
    helpful_votes INTEGER DEFAULT 0,
    total_votes INTEGER DEFAULT 0,
    verified_purchase BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización de consultas analíticas
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_last_login_at ON users(last_login_at);
CREATE INDEX idx_users_segment ON users(user_segment);
CREATE INDEX idx_users_acquisition_channel ON users(acquisition_channel);

CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);

CREATE INDEX idx_page_analytics_created_at ON page_analytics(created_at);
CREATE INDEX idx_page_analytics_page_path ON page_analytics(page_path);
CREATE INDEX idx_page_analytics_user_id ON page_analytics(user_id);

CREATE INDEX idx_conversion_events_event_type ON conversion_events(event_type);
CREATE INDEX idx_conversion_events_created_at ON conversion_events(created_at);
CREATE INDEX idx_conversion_events_user_id ON conversion_events(user_id);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);

-- Triggers para actualizar timestamps automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar métricas de usuario automáticamente
CREATE OR REPLACE FUNCTION update_user_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar last_activity_at cuando hay actividad
    IF TG_TABLE_NAME = 'page_analytics' THEN
        UPDATE users 
        SET last_activity_at = NOW(),
            total_page_views = total_page_views + 1
        WHERE id = NEW.user_id;
    END IF;
    
    -- Actualizar métricas de sesión
    IF TG_TABLE_NAME = 'sessions' THEN
        UPDATE users 
        SET total_sessions = total_sessions + 1,
            last_login_at = NOW()
        WHERE id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_metrics_page_analytics 
    AFTER INSERT ON page_analytics
    FOR EACH ROW EXECUTE FUNCTION update_user_metrics();

CREATE TRIGGER update_user_metrics_sessions 
    AFTER INSERT ON sessions
    FOR EACH ROW EXECUTE FUNCTION update_user_metrics();

-- Función para calcular segmentación automática
CREATE OR REPLACE FUNCTION calculate_user_segment()
RETURNS TRIGGER AS $$
DECLARE
    days_since_last_login INTEGER;
    total_orders INTEGER;
BEGIN
    -- Calcular días desde último login
    SELECT EXTRACT(DAY FROM NOW() - last_login_at) INTO days_since_last_login
    FROM users WHERE id = NEW.user_id;
    
    -- Contar órdenes del usuario
    SELECT COUNT(*) INTO total_orders
    FROM orders WHERE user_id = NEW.user_id;
    
    -- Determinar segmento
    IF days_since_last_login IS NULL OR days_since_last_login <= 7 THEN
        NEW.user_segment = 'active';
    ELSIF days_since_last_login <= 30 THEN
        NEW.user_segment = 'engaged';
    ELSIF days_since_last_login <= 90 THEN
        NEW.user_segment = 'at_risk';
    ELSE
        NEW.user_segment = 'churned';
    END IF;
    
    -- Actualizar segmento VIP si tiene muchas órdenes
    IF total_orders >= 10 THEN
        NEW.user_segment = 'vip';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_user_segment_trigger
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION calculate_user_segment();

-- Políticas de seguridad RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_retention_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios (pueden ver y editar solo sus propios datos)
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Políticas para direcciones
CREATE POLICY "Users can manage own addresses" ON addresses
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Políticas para órdenes
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Políticas para puntos de lealtad
CREATE POLICY "Users can view own loyalty points" ON loyalty_points
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Políticas para productos (lectura pública)
CREATE POLICY "Products are publicly readable" ON products
    FOR SELECT USING (true);

-- Políticas para reseñas (lectura pública, escritura solo para usuarios autenticados)
CREATE POLICY "Reviews are publicly readable" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Políticas para analítica (solo inserción, no lectura)
CREATE POLICY "Allow analytics insertion" ON page_analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow conversion events insertion" ON conversion_events
    FOR INSERT WITH CHECK (true);

-- Comentarios para documentación
COMMENT ON TABLE users IS 'Tabla principal de usuarios con campos de analítica pasiva';
COMMENT ON TABLE page_analytics IS 'Analítica pasiva de páginas visitadas';
COMMENT ON TABLE conversion_events IS 'Eventos de conversión para análisis de funnel';
COMMENT ON TABLE products IS 'Catálogo de productos con métricas de venta';
COMMENT ON TABLE reviews IS 'Reseñas de productos con métricas de engagement';
