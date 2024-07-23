function titleChange(content: string) {
  if (document.title !== content) {
    document.title = content
  }
}

export function autoTitleChange() {
  if (location.href.includes('community') || location.href.includes('wiki/forum')) {
    titleChange('论坛 | PICKCAT')
  }
  else {
    titleChange('PICKCAT')
  }
  if (location.href.includes('work_shop')) {
    if (Number.parseInt(location.href.slice(25 + 10)) && document.querySelector('.r-work_shop-r-details--details_wrap .r-work_shop-r-details--header_cont .r-work_shop-r-details--title p')) {
      titleChange(`工作室 | ${document.querySelector('.r-work_shop-r-details--details_wrap .r-work_shop-r-details--header_cont .r-work_shop-r-details--title p')!.innerHTML} | PICKCAT`)
    }
    else {
      titleChange('工作室 | PICKCAT')
    }
  }
  if (location.href.includes('discover')) {
    titleChange('发现 | PICKCAT')
  }
  if (location.href.includes('gallery')) {
    if (Number.parseInt(location.href.slice(25 + 8)) && document.querySelector('.r-gallery-r-detail--name')) {
      titleChange(`活动 | ${document.querySelector('.r-gallery-r-detail--name')!.innerHTML} | PICKCAT`)
    }
    else {
      titleChange('活动 | PICKCAT')
    }
  }
  if (location.href.includes('user')) {
    titleChange(`个人中心 | ${document.querySelector('.r-user-c-banner--name')!.innerHTML} | PICKCAT`)
  }
  if (location.href.includes('work')) {
    titleChange(`作品 | ${document.querySelector('.r-work-c-work_info--work_name')!.innerHTML} | PICKCAT`)
  }

  if (location.href.includes('studio')) {
    titleChange(`活动 | ${document.querySelector('.r-studio--studio_title')!.innerHTML} | PICKCAT`)
  }

  if (location.href.includes('setting')) {
    titleChange('设置 | PICKCAT')
  }
}
