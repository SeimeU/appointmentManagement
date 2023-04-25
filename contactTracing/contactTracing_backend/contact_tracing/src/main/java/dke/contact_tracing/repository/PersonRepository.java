package dke.contact_tracing.repository;

import dke.contact_tracing.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Integer> {

    List<Person> findAllBySvnr(Integer[] svnrs);

}
