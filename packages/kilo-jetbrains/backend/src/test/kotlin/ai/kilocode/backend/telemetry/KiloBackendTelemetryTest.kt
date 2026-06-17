package ai.kilocode.backend.telemetry

import ai.kilocode.backend.cli.KiloBackendHttpClients
import kotlinx.coroutines.runBlocking
import okhttp3.mockwebserver.MockWebServer
import kotlin.test.Test
import kotlin.test.assertEquals
import java.util.concurrent.TimeUnit

class KiloBackendTelemetryTest {
    @Test
    fun `capture does not post telemetry`() = runBlocking {
        val server = MockWebServer()
        server.start()
        val http = KiloBackendHttpClients.api("secret")
        try {
            KiloBackendTelemetry().capture(http, server.port, "Test Event", mapOf("source" to "test"))

            assertEquals(null, server.takeRequest(100, TimeUnit.MILLISECONDS))
        } finally {
            KiloBackendHttpClients.shutdown(http)
            server.shutdown()
        }
    }

    @Test
    fun `set enabled does not post telemetry`() = runBlocking {
        val server = MockWebServer()
        server.start()
        val http = KiloBackendHttpClients.api("secret")
        try {
            KiloBackendTelemetry().setEnabled(http, server.port, true)

            assertEquals(null, server.takeRequest(100, TimeUnit.MILLISECONDS))
        } finally {
            KiloBackendHttpClients.shutdown(http)
            server.shutdown()
        }
    }

    @Test
    fun `capture failure does not throw`() = runBlocking {
        KiloBackendTelemetry().capture(null, 0, "Test Event", emptyMap())
    }
}
