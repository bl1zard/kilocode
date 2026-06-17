package ai.kilocode.client.actions

import ai.kilocode.client.KiloNotifications
import ai.kilocode.client.plugin.KiloBundle
import com.intellij.icons.AllIcons
import com.intellij.openapi.actionSystem.ActionUpdateThread
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.project.DumbAwareAction

/**
 * Toolbar action that opens the Kilo User Profile settings page.
 *
 * Uses a predicate-based lookup so settings open correctly in JetBrains
 * Remote Development where configurables may be wrapped.
 */
class ShowProfileAction : DumbAwareAction(
    KiloBundle.message("action.Kilo.ShowProfile.text"),
    KiloBundle.message("action.Kilo.ShowProfile.description"),
    AllIcons.General.User,
) {

    override fun actionPerformed(e: AnActionEvent) {
        KiloNotifications.error(e.project, "Login disabled", "Login is disabled in this enterprise build.")
    }

    override fun getActionUpdateThread(): ActionUpdateThread = ActionUpdateThread.BGT
}
