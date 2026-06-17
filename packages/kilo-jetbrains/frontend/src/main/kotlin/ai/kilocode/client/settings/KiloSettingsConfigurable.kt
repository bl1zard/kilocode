package ai.kilocode.client.settings

import ai.kilocode.client.plugin.KiloBundle
import ai.kilocode.client.settings.models.ModelsConfigurable
import ai.kilocode.client.settings.providers.ProvidersConfigurable
import ai.kilocode.client.ui.layout.Stack
import com.intellij.ide.DataManager
import com.intellij.openapi.options.SearchableConfigurable
import com.intellij.openapi.options.ex.Settings
import com.intellij.ui.components.ActionLink
import com.intellij.ui.components.JBLabel
import com.intellij.util.ui.JBUI
import javax.swing.JComponent

/**
 * Root settings entry under Settings -> Tools -> Kilo Code.
 *
 * Displays a brief description and links to local enterprise settings pages.
 * Child configurables are registered in XML (`kilo.jetbrains.frontend.xml`) as
 * `applicationConfigurable` entries with the appropriate `parentId` — that is the
 * single source of truth for the settings hierarchy. This class does NOT implement
 * [com.intellij.openapi.options.SearchableConfigurable.Parent] to avoid creating a
 * second child configurable instance alongside the ones registered in XML.
 *
 * The links use configurable IDs to navigate via [Settings.find]/[Settings.select].
 */
class KiloSettingsConfigurable : SearchableConfigurable {

    override fun getId(): String = ID

    override fun getDisplayName(): String = KiloBundle.message("settings.kilo.displayName")

    override fun createComponent(): JComponent {
        val panel = Stack.vertical()
        panel.border = JBUI.Borders.empty(8, 0, 0, 0)

        val desc = JBLabel(KiloBundle.message("settings.kilo.description"))
        desc.border = JBUI.Borders.emptyBottom(12)
        panel.next(desc)

        val models = ActionLink(KiloBundle.message("settings.models.displayName")) { e ->
            val src = e.source as? JComponent ?: return@ActionLink
            val settings = Settings.KEY.getData(DataManager.getInstance().getDataContext(src)) ?: return@ActionLink
            open(settings, ModelsConfigurable.ID)
        }
        models.border = JBUI.Borders.emptyBottom(4)
        panel.next(models)

        val providers = ActionLink(KiloBundle.message("settings.providers.displayName")) { e ->
            val src = e.source as? JComponent ?: return@ActionLink
            val settings = Settings.KEY.getData(DataManager.getInstance().getDataContext(src)) ?: return@ActionLink
            open(settings, ProvidersConfigurable.ID)
        }
        providers.border = JBUI.Borders.emptyBottom(4)
        panel.next(providers)

        return panel
    }

    override fun isModified(): Boolean = false

    override fun apply() = Unit

    internal fun open(settings: Settings, id: String = ModelsConfigurable.ID) {
        settings.find(id)?.let { settings.select(it) }
    }

    companion object {
        const val ID = "ai.kilocode.jetbrains.settings"
    }
}
