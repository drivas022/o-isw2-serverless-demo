# ISW2 – Serverless Demo

## Reflexión: Calidad y CI

### 1) ¿Qué tipo de error evita el CI?
El CI evita errores que se pueden detectar automáticamente con pruebas, por ejemplo:
- Que el endpoint /api/procesar cambie su contrato (estructura del JSON) y rompa a quien lo consume.
- Errores de lógica simples (por ejemplo no convertir a mayúsculas, o calcular mal la longitud).
- Cambios que “parecen pequeños”, pero rompen funcionalidades ya probadas.

### 2) ¿Qué tipo de error no evita?
El CI no evita errores que no están cubiertos por pruebas o que dependen de contexto real, por ejemplo:
- Errores de UX o que “se mire feo” en producción.
- Problemas de rendimiento bajo carga real, si no hay pruebas de performance.
- Bugs de integración con servicios externos (red, DNS, permisos), si no se simulan o prueban.
- Reglas de negocio que nadie escribió como prueba (si no se automatiza, el CI no lo ve).

### 3) ¿Qué pasaría si un equipo ignora el CI?
Ignorar el CI hace que se metan cambios rotos al repo:
- Se vuelve normal “subir código aunque falle” y después nadie confía en el estado del proyecto.
- Se acumula deuda técnica: arreglar después cuesta más que prevenir.
- Aumentan los bugs en producción y el tiempo se va en apagar incendios en vez de avanzar.
En resumen: el equipo pierde control de calidad y cada cambio se vuelve un riesgo.
