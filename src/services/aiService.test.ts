import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects.ts'
import {
  askCodeaxesAI,
  buildInternalPrompt,
  classifyIntent,
  createMockResponse,
} from './aiService.ts'

const sample = projects[0]

describe('Codeaxes AI service', () => {
  it('classifies and returns a deterministic mock explanation', async () => {
    expect(classifyIntent('Explain this project')).toBe('explain')
    const response = await askCodeaxesAI({
      prompt: 'Explain this project',
      projectId: 'nimbus-mind',
    })
    expect(response.source).toBe('mock')
    expect(response.message).toContain('NimbusMind')
    expect(response.message.toLowerCase()).toContain('architecture')
  })

  it('builds a context-aware internal prompt from the current project', () => {
    expect(sample).toBeDefined()
    const prompt = buildInternalPrompt('Explain this project', sample)
    expect(prompt).toContain('You are Codeaxes AI.')
    expect(prompt).toContain(sample?.title ?? '')
    expect(prompt).toContain(sample?.description ?? '')
    expect(prompt).toContain(sample?.architecture ?? '')
    expect(prompt).toContain('User request:')
  })

  it('suggests improvements and similar projects from the mock layer', () => {
    expect(createMockResponse('Suggest improvements', sample)).toMatch(/improvements/i)
    expect(createMockResponse('Suggest similar projects', sample)).toMatch(/adjacent/i)
  })
})
