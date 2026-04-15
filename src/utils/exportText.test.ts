import { describe, expect, it } from "vitest"
import { buildResumeText } from "@/utils/exportText"
import { createBlankResume, createSampleResume } from "@/state/defaults"

describe("buildResumeText", () => {
  it("outputs name and sections for sample resume", () => {
    const text = buildResumeText(createSampleResume())
    expect(text).toContain("林知行")
    expect(text).toContain("教育经历")
    expect(text).toContain("项目经历")
    expect(text.endsWith("\n")).toBe(true)
  })

  it("handles blank resume", () => {
    const text = buildResumeText(createBlankResume())
    expect(text.trim().length).toBe(0)
  })
})

