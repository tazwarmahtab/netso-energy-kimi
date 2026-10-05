---
name: dev-orchestrator
description: Orchestrates full development workflow for large features using AI tools (gemini for brainstorming and design, codex for plan review and validation, Claude Code subagent for implementation and testing). Use when developing significant new features, complex implementations, or when user mentions "full development workflow", "orchestrate development", or "complete feature development".
---

# Development Orchestrator

This Skill orchestrates a complete development workflow by leveraging multiple AI tools, each with specialized strengths:

- **gemini**: Creative brainstorming, architectural design, multi-option exploration (Google Gemini CLI)
- **codex**: Logical validation, plan review, risk assessment, edge case analysis (OpenAI Codex CLI)
- **Claude Code subagent**: Detailed implementation, code writing, unit testing (via Task tool)

## Prerequisites

Before using this skill, ensure the required tools are ready:

### 1. Gemini CLI (Google Gemini) - For Design
- **Command**: `gemini`
- **Status**: ✅ Already authenticated (cached credentials)
- **Verify**: `gemini "What is 2+2?" -y` (should return 4)

### 2. Codex CLI (OpenAI Codex) - For Review
- **Command**: `codex`
- **Status**: ✅ Already authenticated
- **Verify**: `codex exec "What is 2+2?"` (should return 4)

### 3. Claude Code - For Implementation & Testing
- **Method**: Built-in Task tool with subagent
- **Type**: `general-purpose`
- **Status**: ✅ Available (no setup needed)

### Quick Verification

```bash
# Check external CLI tools
which gemini codex

# Verify they work
gemini "test" -y
codex exec "test"
```

Claude Code subagent is always available.

## When to use this Skill

- **Large feature development**: Significant new functionality requiring design and planning
- **Complex implementations**: Multi-file changes with architectural implications
- **Quality-critical features**: Features requiring thorough testing and validation
- **Uncertain scope**: When brainstorming and exploration would be valuable

## When NOT to use this Skill

- **Small bug fixes**: Simple one-file changes
- **Trivial features**: Adding a single function or small UI tweak
- **Urgent hotfixes**: Time-sensitive changes that need immediate action
- **Well-defined simple tasks**: Clear requirements with obvious implementation

## Workflow Overview

```
┌─────────────────────────────────────────────────────┐
│ Phase 1: Brainstorm & Design (Gemini)              │
│ → Generate design options and architecture         │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│ Phase 2: Review & Plan (Codex)                     │
│ → Validate design, create execution plan           │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│ Phase 3: Design Review (Human - OPTIONAL)          │
│ → Approve plan or request modifications            │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│ Phase 4: Implementation (Droid)                     │
│ → Write code following the approved plan           │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│ Phase 5: Testing (Droid)                            │
│ → Write comprehensive unit tests                    │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│ Phase 6: Final Validation (Human - REQUIRED)       │
│ → Review implementation and approve                 │
└─────────────────────────────────────────────────────┘
```

## Instructions

### Step 0: Task Assessment

Before starting, evaluate the task complexity:

1. **Check if full workflow is needed**:
   - Is this a multi-file change? → Yes: Continue
   - Does it require architectural decisions? → Yes: Continue
   - Is the implementation approach unclear? → Yes: Continue
   - Is it a simple bug fix or trivial feature? → No: Use simplified workflow

2. **For simplified workflow** (small tasks):
   - Skip Phases 1-3
   - Use Claude Code subagent directly for implementation
   - Still require Phase 6 (human validation)

3. **For full workflow** (large features):
   - Proceed with all phases

### Phase 1: Brainstorm & Design (Gemini)

Use gemini to explore design options and create initial architecture.

**Objective**: Generate creative solutions, explore alternatives, identify trade-offs

**Steps**:

1. Prepare a comprehensive prompt for Gemini that includes:
   - The feature requirement/problem statement
   - Current codebase context (file structure, existing patterns)
   - Constraints and requirements
   - Request: Multiple design approaches with pros/cons

2. Call gemini (non-interactive with auto-approval):
   ```bash
   gemini "Design a solution for [FEATURE_DESCRIPTION].

   Context:
   - Codebase: [KEY_PATTERNS]
   - Requirements: [REQUIREMENTS]
   - Constraints: [CONSTRAINTS]

   Please provide:
   1. 2-3 different architectural approaches
   2. Pros and cons of each approach
   3. Recommended approach with justification
   4. Key design decisions and rationale
   5. Potential risks and mitigation strategies" -y
   ```

3. Capture the design output
4. Summarize the key design decisions

**Output**: Design document with multiple options and recommendations

### Phase 2: Review & Plan (Codex)

Use codex to validate the design and create a detailed execution plan.

**Objective**: Logical validation, edge case analysis, concrete implementation plan

**Steps**:

1. Prepare a prompt for Codex that includes:
   - Gemini's design output
   - Request for validation and detailed planning

2. Call codex exec (non-interactive):
   ```bash
   codex exec "Review this design and create an execution plan:

   DESIGN:
   [GEMINI_OUTPUT]

   Please:
   1. Validate the design logic and architecture
   2. Identify potential edge cases and issues
   3. Suggest improvements or corrections
   4. Create a step-by-step implementation plan with:
      - Files to create/modify
      - Key functions/classes to implement
      - Dependencies and prerequisites
      - Testing requirements
      - Potential risks and mitigation

   Format the plan in markdown suitable for a developer agent to execute."
   ```

3. Capture Codex's review and plan

4. **Write the execution plan to a file**:
   - Create a markdown file: `dev-plan-[FEATURE-NAME].md`
   - Include: Design summary, validation results, step-by-step plan
   - Ensure the plan is detailed enough for autonomous execution

**Output**: `dev-plan-[FEATURE-NAME].md` with complete implementation roadmap

### Phase 3: Design Review (Human - OPTIONAL)

Present the plan to the user for approval before implementation.

**Steps**:

1. Ask the user if they want to review the design before implementation:
   ```
   The design and execution plan are ready. Would you like to review
   the plan before I proceed with implementation?

   Plan location: dev-plan-[FEATURE-NAME].md

   Options:
   1. Proceed with implementation (skip review)
   2. Review the plan first
   ```

2. If user chooses to review:
   - Wait for user feedback
   - If modifications needed, return to Phase 1 or 2 as appropriate
   - If approved, proceed to Phase 4

3. If user skips review:
   - Proceed directly to Phase 4

### Phase 4: Implementation (Claude Code Subagent)

Use Claude Code subagent to implement the feature following the approved plan.

**Objective**: Execute the plan, write production-quality code

**Steps**:

1. Launch a general-purpose subagent with the implementation task:
   ```
   Use the Task tool with subagent_type="general-purpose" and prompt:

   "Implement the following feature according to this plan:

   PLAN:
   [CONTENT_FROM_dev-plan-[FEATURE-NAME].md]

   Instructions:
   - Follow the plan step-by-step
   - Write clean, well-structured code
   - Follow existing codebase patterns and conventions
   - Add appropriate error handling
   - Include inline comments for complex logic
   - DO NOT write tests yet (tests come in next phase)

   Report any blockers or issues encountered."
   ```

2. Monitor the subagent's progress
3. Capture implementation results and any issues

**Output**: Implemented feature code

### Phase 5: Testing (Claude Code Subagent)

Use Claude Code subagent to write comprehensive unit tests.

**Objective**: Ensure code quality with thorough test coverage

**Steps**:

1. Launch a general-purpose subagent with the testing task:
   ```
   Use the Task tool with subagent_type="general-purpose" and prompt:

   "Write comprehensive unit tests for the feature just implemented.

   Implementation files:
   [LIST_OF_MODIFIED_FILES]

   Requirements:
   - Test all public functions and methods
   - Cover edge cases and error conditions
   - Follow existing test patterns in the codebase
   - Aim for high coverage of critical paths
   - Include both positive and negative test cases
   - Ensure tests are independent and reproducible

   Run the tests and ensure they all pass."
   ```

2. Monitor test creation and execution
3. Verify all tests pass

**Output**: Test files with passing test suite

### Phase 6: Final Validation (Human - REQUIRED)

Present the completed work to the user for final approval.

**Steps**:

1. Prepare a summary of the implementation:
   ```
   Feature implementation complete! Here's what was done:

   FILES MODIFIED:
   - [list of files changed]

   FILES CREATED:
   - [list of new files]

   TESTS:
   - [number of tests written]
   - [test results summary]

   PLAN ADHERENCE:
   - [any deviations from the plan and why]

   Please review the implementation. You can:
   1. Approve and merge
   2. Request modifications
   3. Ask questions about specific implementation details
   ```

2. Wait for user feedback

3. Handle feedback:
   - **If approved**: Mark the workflow as complete
   - **If modifications needed**:
     - For small changes: Make adjustments directly
     - For larger changes: Return to appropriate phase (usually Phase 4)
   - **If questions**: Answer and clarify, then return to validation

4. Only mark complete when user explicitly approves

**Output**: User-approved, production-ready feature

## Best Practices

### Context Management

- **Keep prompts focused**: Each AI tool should receive relevant context, not everything
- **Progressive refinement**: Each phase builds on the previous, adding detail
- **File-based handoff**: Use markdown files for complex plans that need to persist

### Error Handling

- **Capture tool output**: Always capture and review CLI tool responses
- **Validate before proceeding**: Check each phase output before moving forward
- **Allow rollback**: If a phase fails, be prepared to return to earlier phases

### Communication

- **Keep user informed**: Report progress at the start and end of each phase
- **Highlight decisions**: Call out important architectural or implementation choices
- **Request input when blocked**: Don't guess—ask the user for clarification

### Quality Assurance

- **Don't skip tests**: Phase 5 is critical for quality
- **Follow the plan**: Subagent should stick to Codex's validated plan
- **Document deviations**: If implementation differs from plan, document why

## Simplified Workflow for Small Tasks

For simple features or bug fixes, use Claude Code subagent directly:

```
Launch Task tool with subagent_type="general-purpose":

"[TASK_DESCRIPTION]

Please implement this change and include appropriate tests."

# Then proceed directly to Phase 6 for user validation
```

## Example Usage

### Example 1: Large Feature

```
User: "I need to add a user authentication system with JWT tokens"
Assistant (via dev-orchestrator):
- Assesses: "Large feature requiring full workflow"
- Phase 1 (Gemini): Generates 3 design approaches (session-based, JWT stateless, hybrid)
- Phase 2 (Codex): Reviews, recommends JWT stateless, creates detailed plan → dev-plan-auth.md
- Phase 3 (Human): User reviews and approves plan
- Phase 4 (Claude Code): Implements auth middleware, token generation, user routes
- Phase 5 (Claude Code): Writes unit tests for auth functions, integration tests for routes
- Phase 6 (Human): User reviews and approves
```

### Example 2: Small Feature

```
User: "Add a helper function to format phone numbers"

Assistant (via dev-orchestrator):
- Assesses: "Small, well-defined task - using simplified workflow"
- Launches Claude Code subagent directly to implement function with tests
- Phase 6 (Human): User reviews and approves
```

### Example 3: Design Iteration

```
User: "Add a caching layer to our API"

Assistant (via dev-orchestrator):
- Phase 1 (Gemini): Proposes Redis, in-memory, and CDN approaches
- Phase 2 (Codex): Reviews, identifies issues with in-memory approach, recommends Redis
- Phase 3 (Human): User reviews, requests modification to use Memcached instead
- Returns to Phase 2: Codex creates new plan with Memcached
- Phase 3 (Human): User approves
- Phase 4-6: Implementation, testing, validation
```

## Troubleshooting

### CLI Tools Not Found

If gemini or codex are not available:

1. Check if tools are installed:
   ```bash
   which gemini codex
   ```

2. Verify PATH configuration

3. Ask user to install missing tools or provide alternative invocation method

Note: Claude Code subagent is always available and doesn't require installation.

### Tool Output Issues

If CLI tools return errors or unexpected output:

1. **Capture full error output**: Include stderr in analysis
2. **Adjust prompt format**: Different tools may expect different input formats
3. **Validate prerequisites**: Check if tools need configuration (API keys, etc.)
4. **Fallback options**: If a tool fails, ask user if they want to:
   - Skip that phase
   - Use alternative tool
   - Perform that step manually

### Plan Too Vague

If Codex's execution plan is too high-level for the subagent:

1. **Request refinement**: Call codex again asking for more detail
2. **Add specifics**: Include file paths, function signatures, expected behavior
3. **Break down further**: Split large steps into smaller sub-steps

### Implementation Deviates from Plan

If the subagent encounters issues requiring deviation from the plan:

1. **Document the deviation**: Capture what changed and why
2. **Validate the change**: Ensure it still meets original requirements
3. **Update the plan file**: Keep dev-plan-[FEATURE-NAME].md current
4. **Inform user at Phase 6**: Highlight deviations during final validation

### Tests Failing

If Phase 5 tests don't pass:

1. **Don't proceed to Phase 6**: Fix tests first
2. **Analyze failures**: Determine if issue is in code or tests
3. **Fix and re-run**: Iterate until all tests pass
4. **Consider returning to Phase 4**: If code has fundamental issues

## Advanced Customization

### Custom Tool Commands

If your CLI tools use different commands, adjust the Bash calls in Phase 1 and 2. For example:

```bash
# Gemini with specific model:
gemini "prompt here" -m gemini-2.0-flash-thinking-exp -y

# Codex with specific flags:
codex exec "prompt here" --approval never --reasoning-effort xhigh

# Claude Code subagent (Phase 4 & 5):
# Uses Task tool - no CLI command needed
```

### Adding Additional Phases

You can extend the workflow by adding custom phases:

- **Phase 2.5**: Security review (use specialized security AI tool)
- **Phase 4.5**: Performance profiling (benchmark before proceeding to tests)
- **Phase 5.5**: Integration testing (broader tests beyond unit tests)

### Parallel Execution

For independent sub-features, you can run multiple Phase 4/5 cycles in parallel by launching multiple subagents:

```
# Launch multiple subagents for different modules
# Note: Claude Code will manage these subagents for you

Task tool → subagent 1: "Implement auth module..."
Task tool → subagent 2: "Implement user profile module..."

# Wait for both to complete before Phase 6
```

## Validation Checklist

Before considering the skill complete, verify:

- [ ] Tool orchestration works correctly
- [ ] Each phase produces expected output
- [ ] Plan file is comprehensive enough for execution
- [ ] Human validation points are clear and actionable
- [ ] Error handling covers common failure modes
- [ ] Simplified workflow works for small tasks
- [ ] Examples match your specific CLI tool syntax

## Related Skills

This skill works well alongside:

- **codex-delegator**: Can delegate to codex for specific subtasks
- **long-running-harness**: For multi-session projects
- **tech-proposal**: For generating formal design documents

## Notes

- **CLI tool commands**: This skill uses `gemini` and `codex` for design/review, and Claude Code's built-in Task tool for implementation/testing.
- **Authentication status**:
  - Gemini: ✅ Already authenticated (cached credentials)
  - Codex: ✅ Already authenticated
  - Claude Code: ✅ Always available (built-in)
- **No Droid dependency**: Removed Factory.ai Droid dependency due to authentication issues. Using Claude Code subagent instead.
- **Context limits**: Be mindful of token limits when passing large design documents between tools. Summarize when necessary.
- **Costs**: Running multiple AI tools in sequence may incur significant API costs. Consider this for large projects.
- **Iteration**: The workflow is designed to be iterative. Don't hesitate to loop back to earlier phases if needed.

## Version History

- **v1.1** (2025-12-27): Replace Droid with Claude Code subagent for Phase 4-5 (implementation & testing). All tools now working.
- **v1.0** (2025-12-27): Initial version with 6-phase workflow, Gemini/Codex/Droid orchestration
