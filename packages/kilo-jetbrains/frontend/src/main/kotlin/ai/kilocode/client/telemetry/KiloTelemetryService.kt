@file:Suppress("UnstableApiUsage")

package ai.kilocode.client.telemetry

import ai.kilocode.rpc.KiloAppRpcApi
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.service
import kotlinx.coroutines.CoroutineScope

object Telemetry {
    fun send(event: String, properties: Map<String, String> = emptyMap()) {
        KiloTelemetryService.getInstance().send(event, properties)
    }
}

@Service(Service.Level.APP)
class KiloTelemetryService internal constructor(
    private val cs: CoroutineScope,
    private val rpc: KiloAppRpcApi?,
) {
    constructor(cs: CoroutineScope) : this(cs, null)

    companion object {
        fun getInstance(): KiloTelemetryService = service()
    }

    fun send(event: String, properties: Map<String, String> = emptyMap()) {
        void(cs, rpc, event, properties)
    }

    private fun void(vararg values: Any?) {
        values.forEach { _ -> }
    }
}
