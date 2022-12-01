import { waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { ConfigureLectureService } from './configure-lecture.service';
import { ArtworkDaoService } from './dao/artwork-dao.service';
import { LectureDaoService } from './dao/lecture-dao.service';

describe('ConfigureLectureService', () => {
  let service: ConfigureLectureService;

  let mockLectureDaoService: jasmine.SpyObj<LectureDaoService>;
  let mockArtworkDaoService: jasmine.SpyObj<ArtworkDaoService>;

  const artwork1: Artwork = {
    id: 1,
    title: 'Le Hobbit',
    type: ArtworkType.book
  };

  const artwork2: Artwork = {
    id: 2,
    title: 'Harry Potter 1',
    type: ArtworkType.book
  };

  //Private proprerties
  const lecture = 'lecture';

  beforeEach(() => {
    mockLectureDaoService = jasmine.createSpyObj<LectureDaoService>('LectureDaoService', [
      'saveLecture']);

    mockArtworkDaoService = jasmine.createSpyObj<ArtworkDaoService>('ArtworkDaoService', [
      'findAllArtworksByType', 'saveArtwork', 'updateArtwork']);

    service = new ConfigureLectureService(mockLectureDaoService, mockArtworkDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getCurrentLecture', () => {
    const lect = new Lecture();
    service[lecture] = lect;
    expect(service.getCurrentLecture().date).toEqual(lect.date);
  });


  it('initializeNewLecture', async () => {
    const initializeLecture = service.initializeNewLecture();
    await (new Promise(resolve => setTimeout(resolve, 500)));
    expect(initializeLecture.date).not.toEqual(new Lecture().date);
    expect(service.getCurrentLecture().date).toEqual(initializeLecture.date);
  });

  it('findArtworksByType', async () => {
    const artworksList = [
      artwork1,
      artwork2
    ];
    await mockArtworkDaoService.findAllArtworksByType.and.returnValue(of(artworksList).toPromise());
    let artworks = await service.findArtworksByType(ArtworkType.book);
    expect(artworks.length).toEqual(2);

    await mockArtworkDaoService.findAllArtworksByType.and.returnValue(of([]).toPromise());
    artworks = await service.findArtworksByType(ArtworkType.movie);
    expect(artworks.length).toEqual(0);
  });

  it('addArtwork', async () => {
    await mockArtworkDaoService.saveArtwork.and.returnValue(of(artwork1).toPromise());
    const artwork = await service.addArtwork(new Artwork(artwork1.title, artwork1.type));

    expect(artwork.id).toEqual(artwork1.id);
  });

  it('updateArtwork', async () => {
    await service.updateArtwork(artwork1);
    expect(mockArtworkDaoService.updateArtwork).toHaveBeenCalled();
  });

  it('saveLecture', async () => {
    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    let lect = new Lecture();
    lect.artwork = film;
    service[lecture] = lect;

    await mockLectureDaoService.saveLecture.and.returnValue(of(lect).toPromise());


    await service.saveLecture();
    expect(mockLectureDaoService.saveLecture).toHaveBeenCalled();
    lect = service[lecture];
    expect(lect.artwork.type).toEqual(ArtworkType.movie);

  });
});
