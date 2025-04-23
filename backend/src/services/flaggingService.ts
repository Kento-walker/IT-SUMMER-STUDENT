import { Candidate, Flag } from '../server';

export function evaluateCandidate(candidate: Candidate): Flag[] {
  const flags: Flag[] = [];
  let hasFailedRequirements = false;

  // NAC Exam evaluation
  if (candidate.nacExam < 0 || candidate.nacExam > 100) {
    hasFailedRequirements = true;
    flags.push({
      type: 'NAC_EXAM_INVALID',
      severity: 'high',
      message: 'NAC Exam score is invalid',
      acknowledged: false
    });
  } else if (candidate.nacExam === 50) {
    flags.push({
      type: 'NAC_EXAM_BORDERLINE',
      severity: 'medium',
      message: 'NAC Exam score is at minimum passing threshold',
      acknowledged: false
    });
  } else if (candidate.nacExam < 50) {
    hasFailedRequirements = true;
    flags.push({
      type: 'NAC_EXAM_LOW',
      severity: 'high',
      message: 'NAC Exam score is below passing threshold',
      acknowledged: false
    });
  }

  // MCCQE1 Result evaluation
  if (candidate.mccqe1Result < 0 || candidate.mccqe1Result > 100) {
    hasFailedRequirements = true;
    flags.push({
      type: 'MCCQE1_INVALID',
      severity: 'high',
      message: 'MCCQE1 score is invalid',
      acknowledged: false
    });
  } else if (candidate.mccqe1Result === 60) {
    flags.push({
      type: 'MCCQE1_BORDERLINE',
      severity: 'medium',
      message: 'MCCQE1 score is at minimum passing threshold',
      acknowledged: false
    });
  } else if (candidate.mccqe1Result < 60) {
    hasFailedRequirements = true;
    flags.push({
      type: 'MCCQE1_LOW',
      severity: 'high',
      message: 'MCCQE1 score is below passing threshold',
      acknowledged: false
    });
  }

  // Canadian Experience evaluation
  if (candidate.canadianExperience < 0) {
    hasFailedRequirements = true;
    flags.push({
      type: 'EXPERIENCE_INVALID',
      severity: 'high',
      message: 'Canadian experience value is invalid',
      acknowledged: false
    });
  } else if (candidate.canadianExperience === 1) {
    flags.push({
      type: 'EXPERIENCE_MINIMUM',
      severity: 'low',
      message: 'Candidate has minimum required Canadian experience',
      acknowledged: false
    });
  } else if (candidate.canadianExperience < 1) {
    hasFailedRequirements = true;
    flags.push({
      type: 'EXPERIENCE_LOW',
      severity: 'medium',
      message: 'Limited Canadian experience',
      acknowledged: false
    });
  }

  // Practice Gaps evaluation
  if (candidate.practiceGaps < 0) {
    hasFailedRequirements = true;
    flags.push({
      type: 'GAPS_INVALID',
      severity: 'high',
      message: 'Practice gaps value is invalid',
      acknowledged: false
    });
  } else if (candidate.practiceGaps > 2) {
    hasFailedRequirements = true;
    flags.push({
      type: 'GAPS_HIGH',
      severity: 'high',
      message: 'Significant practice gaps detected',
      acknowledged: false
    });
  } else if (candidate.practiceGaps > 1) {
    flags.push({
      type: 'GAPS_MEDIUM',
      severity: 'medium',
      message: 'Moderate practice gaps detected',
      acknowledged: false
    });
  }

  // Check if all requirements are passed
  if (!hasFailedRequirements && 
      candidate.nacExam >= 50 && 
      candidate.mccqe1Result >= 60 && 
      candidate.canadianExperience >= 1 && 
      candidate.practiceGaps <= 2) {
    flags.push({
      type: 'ALL_REQUIREMENTS_PASSED',
      severity: 'low',
      message: 'Candidate has successfully met all requirements',
      acknowledged: false
    });
  }

  return flags;
} 