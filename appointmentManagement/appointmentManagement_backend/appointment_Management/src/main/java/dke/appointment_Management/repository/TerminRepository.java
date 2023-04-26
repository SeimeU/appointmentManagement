package dke.contact_tracing.repository;

import dke.contact_tracing.entity.Termin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TerminRepository extends JpaRepository<Termin, Integer> {

    List<Termin> findAllById(Integer[] id);

}
