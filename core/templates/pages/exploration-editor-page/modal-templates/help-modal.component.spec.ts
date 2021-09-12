// Copyright 2020 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for HelpModalComponent.
 */

import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SiteAnalyticsService } from 'services/site-analytics.service';
import { ContextService } from 'services/context.service';
import { HelpModalComponent } from './help-modal.component';

fdescribe('Help Modal Component', () => {
  let fixture: ComponentFixture<HelpModalComponent>;
  let componentInstance: HelpModalComponent;
  let contextService: ContextService;
  let siteAnalyticsService: SiteAnalyticsService;
  let ngbActiveModal: NgbActiveModal;
  let registerOpenTutorialFromHelpCenterEventSpy;
  let registerVisitHelpCenterEventSpy;
  const explorationId = 'exp1';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModalModule
      ],
      declarations: [
        HelpModalComponent
      ],
      providers: [
        NgbActiveModal,
        ContextService,
        SiteAnalyticsService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    ngbActiveModal = (TestBed.inject(NgbActiveModal) as unknown) as
      jasmine.SpyObj<NgbActiveModal>;
    contextService = TestBed.inject(ContextService);
    spyOn(contextService, 'getExplorationId').and.returnValue(explorationId);

    fixture = TestBed.createComponent(HelpModalComponent);
    componentInstance = fixture.componentInstance;
    siteAnalyticsService = (TestBed.inject(SiteAnalyticsService) as unknown) as jasmine.SpyObj<SiteAnalyticsService>
    spyOn(siteAnalyticsService, 'registerOpenTutorialFromHelpCenterEvent');
    spyOn(siteAnalyticsService, 'registerVisitHelpCenterEvent');
  });

  it('should begin editor tutorial when closing the modal', () => {
    componentInstance.beginEditorTutorial();

    expect(siteAnalyticsService.registerOpenTutorialFromHelpCenterEvent)
      .toHaveBeenCalledWith(explorationId);
    expect(ngbActiveModal.close).toHaveBeenCalledWith('editor');
  });

  it('should begin translation tutorial when closing the modal', () => {
    componentInstance.beginTranslationTutorial();

    expect(siteAnalyticsService.registerOpenTutorialFromHelpCenterEvent)
      .toHaveBeenCalledWith(explorationId);
    expect(ngbActiveModal.close).toHaveBeenCalledWith('translation');
  });

  it('should dismiss modal when changing to help center', () => {
    componentInstance.goToHelpCenter();

    expect(siteAnalyticsService.registerVisitHelpCenterEvent).toHaveBeenCalledWith(explorationId);
    expect(ngbActiveModal.dismiss).toHaveBeenCalledWith('cancel');
  });
});
