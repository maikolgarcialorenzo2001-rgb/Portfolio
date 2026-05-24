import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('returns all skills', () => {
    const skills = service.allSkills();
    expect(skills.length).toBeGreaterThan(0);
  });

  it('filters skills by category', () => {
    const frontendSkills = service.getSkillsByCategory('frontend');
    expect(frontendSkills.length).toBeGreaterThan(0);
    expect(
      frontendSkills.every((s) => s.category === 'frontend'),
    ).toBe(true);
  });

  it('returns profile data', () => {
    const profile = service.profileData();
    expect(profile.name).toBeDefined();
    expect(profile.experience.length).toBeGreaterThan(0);
  });
});
