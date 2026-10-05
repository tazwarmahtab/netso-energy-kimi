# Development Orchestrator Skill

A comprehensive workflow orchestration skill that coordinates AI tools for end-to-end feature development.

## Quick Start

### Prerequisites

Ensure you have these tools ready:

```bash
# Check installations
which gemini   # For design and brainstorming
which codex    # For plan review and validation
# Claude Code subagent is built-in (no installation needed)
```

### Basic Usage

Simply ask Claude Code to develop a feature:

```
"I need to implement [FEATURE_DESCRIPTION] using the full development workflow"
```

Claude will automatically:
1. Use Gemini for creative design exploration
2. Use Codex to validate and create execution plan
3. Optionally ask you to review the plan
4. Use Claude Code subagent to implement the code
5. Use Claude Code subagent to write comprehensive tests
6. Ask you for final approval

## Workflow Phases

### Phase 1: Brainstorm & Design (Gemini)
- Explores multiple architectural approaches
- Identifies trade-offs and risks
- Recommends best approach

### Phase 2: Review & Plan (Codex)
- Validates the design logic
- Identifies edge cases
- Creates detailed execution plan
- Outputs `dev-plan-[FEATURE-NAME].md`

### Phase 3: Design Review (Human - Optional)
- You can review and approve the plan
- Or skip and proceed directly to implementation

### Phase 4: Implementation (Claude Code)
- Executes the approved plan
- Writes production-quality code
- Follows codebase conventions

### Phase 5: Testing (Claude Code)
- Writes comprehensive unit tests
- Ensures all tests pass
- Covers edge cases

### Phase 6: Final Validation (Human - Required)
- You review the complete implementation
- Approve or request modifications

## Examples

### Large Feature
```
User: "Add user authentication with JWT tokens"
→ Full 6-phase workflow
→ ~30-60 minutes depending on complexity
```

### Small Feature
```
User: "Add a phone number formatting helper"
→ Simplified workflow (skips to Phase 4)
→ ~5-10 minutes
```

## Customization

### Adjusting CLI Commands

Edit SKILL.md if your tools use different syntax:

```yaml
# Example: If your geminicli uses different format
geminicli chat --model flash-thinking "prompt here"

# Example: If codexcli needs flags
codex exec --strict --format md "prompt here"
```

### Adding Validation Steps

You can extend the workflow by adding custom phases between existing ones. See the "Advanced Customization" section in SKILL.md.

## Troubleshooting

### Skill Not Activating

Make sure your request includes trigger words like:
- "full development workflow"
- "orchestrate development"
- "complete feature development"
- Or describe a large/complex feature

### Tool Not Found

```bash
# Verify tools are in PATH
echo $PATH

# Or provide full paths in SKILL.md:
/usr/local/bin/geminicli exec "..."
```

### Plan Too Vague

If Codex's plan isn't detailed enough for Droid:
- The skill will automatically request more detail
- Or you can manually edit `dev-plan-[FEATURE-NAME].md`

## Tips

1. **Use for complex features**: The orchestration overhead is worth it for multi-file, architectural changes

2. **Review the plan**: Phase 3 review helps catch issues early before implementation

3. **Trust the process**: Each tool has its strengths - Gemini for creativity, Codex for logic, Droid for execution

4. **Iterate as needed**: You can loop back to earlier phases if requirements change

5. **Monitor costs**: Multiple AI tools = multiple API calls. Consider this for large projects.

## File Structure

```
~/.claude/skills/dev-orchestrator/
├── SKILL.md          # Main skill definition (read by Claude)
└── README.md         # This file (for humans)
```

When running, the skill creates:
```
your-project/
└── dev-plan-[FEATURE-NAME].md    # Execution plan from Phase 2
```

## Next Steps

1. **Test the skill**: Try a simple feature first to validate your CLI tools work correctly

2. **Customize commands**: Adjust the Bash commands in SKILL.md to match your actual CLI syntax

3. **Extend if needed**: Add custom phases for security review, performance testing, etc.

4. **Share with team**: If useful, move to `.claude/skills/` in your project repo for team access

## Support

- See SKILL.md for complete documentation
- Check "Troubleshooting" section in SKILL.md for common issues
- Verify your CLI tools work independently before using the skill

## Version

Current: v1.0 (2025-12-27)
