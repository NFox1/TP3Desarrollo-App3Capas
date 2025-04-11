# TP3Desarrollo-App3Capas

## Estructura de capas:

1. **Capa de Presentación (app.js)**:
   - Maneja rutas HTTP
   - Contiene toda la interfaz HTML/CSS/JS
   - Se comunica con la capa de negocio
   - Renderiza la vista con datos actualizados

2. **Capa de Negocio (productService.js)**:
   - Contiene reglas de negocio y validaciones
   - Transforma datos según necesidades
   - Se comunica con la capa de datos

3. **Capa de Datos (productRepository.js)**:
   - Gestiona el almacenamiento en memoria
   - Realiza operaciones CRUD básicas

## Ventajas respecto a la versión monolítica

1. **Mejor organización**: Código fácil de navegar
2. **Separación de responsabilidades**: Cada capa tiene un propósito claro
3. **Facilidad de mantenimiento**: Cambios en una capa no afectan necesariamente a las otras
4. **Testabilidad**: Cada capa puede ser probada de forma aislada
5. **Reutilización**: La lógica de negocio y acceso a datos puede ser usada por diferentes interfaces
6. **Escalabilidad**: Más fácil adaptar o reemplazar componentes individuales
7. **Trabajo en equipo**: Diferentes desarrolladores pueden trabajar en distintas capas simultáneamente