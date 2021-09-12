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
 * @fileoverview Component for help modal.
 */

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContextService } from 'services/context.service';
import { SiteAnalyticsService } from 'services/site-analytics.service';

@Component({
  selector: 'oppia-help-modal',
  templateUrl: './help-modal.component.html'
})
export class HelpModalComponent {
  private explorationId: string;
  private static EDITOR_TUTORIAL_MODE: string = 'editor';
  private static TRANSLATION_TUTORIAL_MODE: string = 'translation';

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private contextService: ContextService,
    private siteAnalytiscService: SiteAnalyticsService,
  ) {
    this.explorationId = (
      contextService.getExplorationId());
  }

  beginEditorTutorial(): void {
    this.siteAnalytiscService
        .registerOpenTutorialFromHelpCenterEvent(this.explorationId);
    this.ngbActiveModal.close(HelpModalComponent.EDITOR_TUTORIAL_MODE);
  }

  beginTranslationTutorial(): void {
    this.siteAnalytiscService
      .registerOpenTutorialFromHelpCenterEvent(this.explorationId);
    this.ngbActiveModal.close(HelpModalComponent.TRANSLATION_TUTORIAL_MODE);
  }

  goToHelpCenter(): void {
    this.siteAnalytiscService
      .registerVisitHelpCenterEvent(this.explorationId);
    this.ngbActiveModal.dismiss('cancel');
  }
}
