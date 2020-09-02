import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../@core/interfaces/user-info';
import { QuillMentionInfo } from '../../../@core/interfaces/quill-mention-info';
import { QuillEditorToolbarConfig } from '../../../@core/config/quill-editor-toolbar-config';
import QuillMention from 'quill-mention';

declare const Quill: any;
Quill.register({ 'modules/mention': QuillMention });

@Component({
  selector: 'ngx-editor-demo',
  templateUrl: './editor-demo.component.html',
  styleUrls: ['./editor-demo.component.scss']
})
export class EditorDemoComponent implements OnInit {

  content: string;

  modules: any;
  allUsersMentionList: QuillMentionInfo[] = [
    {
      id: 1,
      value: 'Brian Smith'
    },
    {
      id: 2,
      value: 'Sasuke Hirano'
    },
    {
      id: 3,
      value: 'George Sly'
    },
    {
      id: 4,
      value: 'David Quigley'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.initQuillModules();
  }

  async getFilteredUsers(searchTerm): Promise<any> {
    return this.allUsersMentionList.filter(x => x.value.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  initQuillModules() {
    this.modules = {
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@"],
        source: async (searchTerm, renderList) => {
          const matchedPeople = await this.getFilteredUsers(searchTerm);
          renderList(matchedPeople);
        }
      },
      toolbar: QuillEditorToolbarConfig
    }
  }

}
