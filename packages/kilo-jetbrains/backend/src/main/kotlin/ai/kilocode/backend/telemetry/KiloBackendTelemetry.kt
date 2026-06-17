package ai.kilocode.backend.telemetry

import com.intellij.openapi.components.Service
import okhttp3.OkHttpClient

@Service(Service.Level.APP)
class KiloBackendTelemetry {
    suspend fun capture(http: OkHttpClient?, port: Int, event: String, properties: Map<String, String>) {
        void(http, port, event, properties)
    }

    suspend fun setEnabled(http: OkHttpClient?, port: Int, enabled: Boolean) {
        void(http, port, enabled)
    }

    private fun void(vararg values: Any?) {
        values.forEach { _ -> }
    }
}
