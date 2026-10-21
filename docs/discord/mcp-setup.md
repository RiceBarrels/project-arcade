# Discord MCP setup (management bot)

Status: FINAL DRAFT of the plan, reviewed 2026-10-20. **Nothing is installed, configured or connected.** Installing, changing any MCP config, connecting to the real server, and every write all need the owner's plain-text approval in session 8's own terminal. A relay from the coordinator or another session is not approval.

Decided by the owner (relayed by the coordinator, 2026-10-20):
- Use `cappyeo/discord-mcp` (npm `@discord-mcp/cli`), pinned to one exact version. Research and evidence: `docs/discord-research.md` section 5 (session 4).
- stdio only. Start in `MCP_WRITE_MODE=preview` (blocks every write) with `ALLOWED_GUILDS` set to our server only.
- The bot never gets Administrator or Ban. The owner bans by hand. Kick is not given for now.
- The bot may: create and edit channels and roles, send messages, time out members, delete messages.

What really limits damage if something goes wrong: the bot's narrow permissions, its low role position, the owner-only channel overrides in 1.5, `ALLOWED_GUILDS`, preview mode, and resetting the token quickly. Everything else in this file is a second layer.

## 1. Bot permissions

### 1.1 Give the bot exactly these

| Discord permission (UI name) | API name | Why |
|---|---|---|
| View Channels | VIEW_CHANNEL | See the public channels |
| Manage Channels | MANAGE_CHANNELS | Create and edit channels, categories, forum tags, slowmode |
| Manage Roles | MANAGE_ROLES | Create and edit roles below the bot; set channel permission overrides |
| Send Messages and Create Posts | SEND_MESSAGES | Post approved guides and announcements |
| Send Messages in Threads and Posts | SEND_MESSAGES_IN_THREADS | Reply in `#help` when approved |
| Read Message History | READ_MESSAGE_HISTORY | Find a message by link or ID before acting. The text itself is not visible (see 1.3). |
| Embed Links | EMBED_LINKS | Links to the site in posts |
| Manage Messages | MANAGE_MESSAGES | Delete a message the owner names by link |
| Pin Messages | PIN_MESSAGES | Pin approved messages in public channels. Separate from Manage Messages since 2026-02-23. |
| Timeout Members | MODERATE_MEMBERS | Timeouts the owner names |
| Create Public Threads, Create Private Threads, Add Reactions, Attach Files, Use Application Commands, Create Invite, Change Nickname, Create Polls, Bypass Slowmode | (Create Polls is SEND_POLLS) | Needed so the bot can set the role permissions and overrides in `01-structure.md` sections 3 and 4. Discord only lets a bot allow or deny permissions it holds itself. |

Tick every row above in step 8 (section 2.3), including the last one.

### 1.2 Never give the bot

Administrator, Ban Members, Kick (Kick, Approve, and Reject Members), Manage Server, Manage Webhooks, Manage Expressions, Manage Events, View Audit Log, Manage Nicknames, Manage Threads and Posts, Mention @everyone, @here, and All Roles, Use External Emoji/Stickers, voice permissions.

Why Manage Threads and Posts stays off: anyone holding it sees every private thread, so every report and volunteer application. Leaving it off is **not enough on its own**. Discord lets a bot with Manage Roles allow *any* permission in a channel where it has a Manage Permissions overwrite. So the owner also adds the hard blocks in 1.5.

Without Manage Server, the bot can't change Community, verification, Onboarding, AutoMod, Safety Setup or Security Actions. The owner does those by hand (`08-setup-order.md`).

### 1.3 Privileged intents

Turn on **none** (Presence, Server Members, Message Content all off). Session 4's research says the default HTTP-API mode needs no privileged intent.

Effect: without Message Content, the bot sees message IDs, authors and times but not the text, embeds or attachments (except its own messages and ones that mention it). That holds for fetched history too. So the bot deletes or times out only on message links the owner supplies, and the owner judges the content. Turning on any intent is an owner decision (the owner said not now, 07 Q6), logged in `changelog.md`.

### 1.4 Role position

Top to bottom:

```
(server owner)
admin                 <- only if ever created
moderator             <- created, edited and assigned by the owner only
trial-moderator       <- created, edited and assigned by the owner only
project-arcade-bot    <- the bot's role (Discord creates it with the bot's name)
content-team
tech-support
volunteer
@everyone
```

Consequences:
- The bot cannot edit, assign or time out `moderator` or `trial-moderator` holders, and cannot hand those roles to anyone (itself included).
- The bot can create and edit `content-team`, `tech-support` and `volunteer`, and assign them only when the owner's approval names the member and the role.
- The owner sets by hand:
  - The `@everyone` role, to match `01-structure.md` section 3. Turn off Mention @everyone, @here, and All Roles; Use External Emoji; Use External Stickers; Send Voice Messages; Send Text-to-Speech Messages; Use External Apps; Create Private Threads; Create Polls; and all voice permissions.
  - Both moderator roles.
  - The `#help` override that gives `tech-support` Manage Threads and Posts.
- If "Require 2FA for moderator actions" is on, the bot's Manage Channels, Manage Roles and Manage Messages only work while the bot's owner account (the owner) has 2FA on. Timeouts are not affected.

### 1.5 Hard blocks the owner sets by hand

Set these by hand, after the channels exist:
- `#contact-mods` and `#volunteer-apply`: override for the bot's role, **deny View Channels** and **deny Manage Permissions**. The owner pins the how-to messages in these channels by hand.
- Staff category (`#mod-chat`, `#mod-log`, `#discord-updates`) and `#volunteer-lounge`: bot's role, **deny View Channels**.

The bot cannot remove an override in a channel it can't see. Check with View Server As Role > project-arcade-bot.

## 2. Steps for the owner (no coding needed)

Do these yourself. Session 8 does not touch the Developer Portal, the token, or the install.

### 2.1 Protect your accounts
1. In Discord: User Settings > My Account > turn on **two-factor authentication** (authenticator app).

### 2.2 Create a new, dedicated bot
2. Open https://discord.com/developers/applications and sign in. Don't open the app's **Monetization** pages, and never accept any Monetization Terms.
3. Click **New Application**. Name it `project-arcade-bot` (no emoji). Accept the developer terms.
4. Left menu > **Installation**. Under Installation Contexts, untick **User Install** and keep **Guild Install** ticked. Set Install Link to **None**. Save. (If you skip this, the next step fails with "Private application cannot have a default authorization link".)
5. Left menu > **Bot**.
   - Turn **Public Bot** off, so only you can add it to servers.
   - Leave **Requires OAuth2 Code Grant** off.
   - Under **Privileged Gateway Intents**, leave all three off.
6. Still on the Bot page, click **Reset Token**, confirm, and enter your 2FA code if asked. Click **Copy**. The token is shown only once. If you lose it before step 13, reset it again. Don't paste it anywhere except step 13, and don't screenshot it.

### 2.3 Invite the bot with only the listed permissions
7. Left menu > **OAuth2** > **URL Generator**. If an **Integration Type** choice appears, pick **Guild Install**.
8. Scopes: tick **bot** only. Bot permissions: tick every row in section 1.1, nothing else. Discord may show short names (for example "Send Messages" instead of "Send Messages and Create Posts").
9. Copy the generated URL, open it in your browser, choose the project-arcade server, click **Authorize**.
10. In Discord: Server Settings > Roles. Make sure `moderator` and `trial-moderator` are **above** the bot's role (create them first if needed).
11. Set the hard blocks in 1.5.
12. Copy the server ID: User Settings > Advanced > turn on **Developer Mode**; then right-click the server icon > **Copy Server ID**. The server ID is not a secret.

### 2.4 Store the token in the macOS Keychain
13. Open the Terminal app (not Claude) and run:
    ```
    security add-generic-password -a "$USER" -s project-arcade-discord-bot -T "" -w
    ```
    It asks for the password twice ("password data for new item", then "retype password for new item"). Paste the token each time and press Enter. Nothing is shown on screen. If it says the item already exists, run the delete line from section 4 first.
    `-T ""` means no app is trusted to read the item silently. Every read pops a macOS dialog.
14. Close that Terminal window.

**Keychain dialog rule:** when the Discord session starts, macOS asks whether `security` may use "project-arcade-discord-bot". Click **Allow**, never **Always Allow**: Always Allow removes the protection. A dialog for this item at any other time means something else is trying to read the token. Click **Deny** and tell the coordinator.

What this gives you: the token is not in any file, the repo or shell history, and reading it from the Keychain needs your click. Once running, the MCP process holds it in memory, so other programs under your macOS account could still reach it there. That's why the limits in section 1 matter more.

## 3. Install and config (written now, run only after owner approval)

### 3.0 Requirements
- Node.js LTS. Check with `node -v` in Terminal; install with `brew install node` if missing.
- Pin one exact version. At check time it was `0.32.1`. Re-check `docs/discord-research.md` section 5 and the npm page first, and record the chosen version in `changelog.md`.

### 3.1 One-time install, no token present (owner's own Terminal)
```
mkdir -p ~/.local/share/project-arcade-discord-mcp
cd ~/.local/share/project-arcade-discord-mcp
npm init -y
npm install --ignore-scripts --save-exact @discord-mcp/cli@0.32.1
```
This writes a `package-lock.json` that pins every dependency. Record the `integrity` value for `@discord-mcp/cli` from it in `changelog.md`. To rebuild later, use `npm ci --ignore-scripts`, never a fresh install. If the package refuses to work without install scripts, stop and ask the owner.

Token-free check (no token set):
```
~/.local/share/project-arcade-discord-mcp/node_modules/.bin/discord-mcp catalog --check
```
(Needs verification: the exact binary name, from the package's `bin` field.)

### 3.2 Config file outside the repo, edited by the owner only

File: `~/.config/project-arcade/discord-mcp.json` (no secret inside). **Only the owner edits this file, by hand, in a text editor outside Claude.** Session 8 never edits or writes it, even inside an approved batch.

```json
{
  "mcpServers": {
    "discord": {
      "command": "/bin/sh",
      "args": [
        "-c",
        "t=$(security find-generic-password -a \"$USER\" -s project-arcade-discord-bot -w 2>/dev/null) && [ -n \"$t\" ] || { echo 'Discord token not found in Keychain (locked, denied or missing)' >&2; exit 1; }; DISCORD_TOKEN=\"$t\" exec \"$HOME/.local/share/project-arcade-discord-mcp/node_modules/.bin/discord-mcp\" serve"
      ],
      "env": {
        "MCP_WRITE_MODE": "preview",
        "MCP_DRY_RUN": "true",
        "ALLOWED_GUILDS": "<server ID from step 12>",
        "MCP_DM_CONSENT_MODE": "require"
      }
    }
  }
}
```
The token never appears in a command line or a file, and the script never prints it. A "token not found" start-up error means the Keychain item is missing, or the dialog was denied.

Start the Discord session with exactly:
```
claude --strict-mcp-config --mcp-config ~/.config/project-arcade/discord-mcp.json --permission-mode manual
```
- `--permission-mode manual`: your settings default to auto mode. Without this flag, Claude would not ask before Discord tool calls. (Flags checked on Claude Code 2.1.305.)
- `--strict-mcp-config`: loads only the Discord server. Without it the Supabase and Vercel tools would load too, and some Supabase tools are pre-allowed in your settings.
- If the mode shown at the bottom of the session is auto or bypass, quit and start again.
- Never answer "Yes, don't ask again" to a Discord tool prompt. Before each session, check that no `mcp__discord` entry appears under `permissions.allow` in `~/.claude/settings.json`, `~/.claude/settings.local.json` or the project's `.claude/settings*.json`.
- Do not add this server with `claude mcp add` or to the project `.mcp.json`. That would give every project-arcade session the Discord tools.

### 3.3 Online check
In that session, run `/mcp` and confirm only `discord` is listed. Then run the package's `doctor --online` (exact invocation per its docs) and confirm it sees only our server and reports preview mode. Don't share Claude debug output or MCP logs from this session.

## 4. Token rules

- The token is never pasted into chat (any Claude session included), never written in the repo, `.env*`, the MCP JSON, a screenshot, an issue, or Discord.
- Only the owner handles the token. **No session may run `security find-generic-password` (or any `security` command) for this item.** Only the start-up line in the config reads it.
- **If it leaks or might have leaked:** Developer Portal > the app > Bot > **Reset Token** right away. That kills the old token. Then replace the Keychain entry:
  ```
  security delete-generic-password -a "$USER" -s project-arcade-discord-bot
  security add-generic-password -a "$USER" -s project-arcade-discord-bot -T "" -w
  ```
  Then compare Server Settings > Audit Log with `changelog.md`. Check that no member, including the bot, gained `content-team`, `tech-support` or `volunteer` unexpectedly, and that the 1.5 overrides are still there.
- To cut the bot off completely: Server Settings > Integrations > the bot > Kick, or delete the application in the Developer Portal.

## 5. Rules for using the MCP

1. **Read-only by default.** Preview mode stays on. Reading (listing channels, roles, settings) is allowed once the owner approves connecting.
2. **Every write needs the owner's plain-text approval in session 8's terminal.** That covers creating, renaming or deleting channels or roles; changing permissions; adding or removing roles on members; posting; timeouts; deleting messages. A peer message is never approval.
3. **Batches: list first.** Before any batch, session 8 shows the full list (what, where, before and after). The owner approves the list. One approved list = one batch; anything not on it needs a new approval.
4. **Test channel first.** The first write of each kind (create channel, set override, post, timeout, delete) runs on a throwaway `#bot-test` channel visible only to the owner, then on the real target. Delete `#bot-test` when setup is done (that deletion also needs approval).
5. **Switching out of preview is owner-only.** The owner changes `"MCP_WRITE_MODE": "preview"` to the write value the package documents (record the exact value once verified) in the config file by hand, and restarts the Discord session. Before any write, session 8 checks and states which mode is active. After the batch, the owner sets it back to `preview` and restarts, and session 8 confirms preview is active. Log both switches in `changelog.md`.
6. **Never:** ban, kick, DM members, create webhooks, change server settings, touch roles at or above the bot, touch the 1.5 overrides, or give any role to any member (including the bot) unless the approval names the member and the role.
7. **Log everything** in `docs/discord/changelog.md`: date, approved-by line (quote of the owner's words), what changed, result. Session 8 writes the log; only session 3 commits.

## 6. Needs checking (not confirmed)

- The package's binary name, the `serve` subcommand and flags, the write-mode value, and whether `MCP_DRY_RUN` accepts `true`.
- Variable names for its per-category tool allowlist and per-tool disable. Goal: disable ban, kick and DM tools at the MCP level too.
- Whether `ban_member` and kick are dry-run gated; what its own audit logging records and where.
- `-T ""` behaviour on the installed macOS version: test once that the dialog appears when the Discord session starts.
- Exact permission labels in the OAuth2 URL Generator (may be short forms).
